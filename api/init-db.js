import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res)
}

async function handler(req, res) {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(50) DEFAULT 'user',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS enrollments (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                phone VARCHAR(50) NOT NULL,
                address TEXT NOT NULL,
                email VARCHAR(255) NOT NULL,
                course VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;

        // Seed Admin
        const { rows } = await sql`SELECT * FROM users WHERE role = 'admin' LIMIT 1`;
        if (rows.length === 0) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await sql`
                INSERT INTO users (name, email, password, role)
                VALUES ('admin', 'admin@example.com', ${hashedPassword}, 'admin')
            `;
            console.log('Admin user seeded successfully');
        }

        res.status(200).json({ message: 'Database initialization completed.' });
    } catch (error) {
        console.error('Init failed:', error);
        res.status(500).json({ error: 'Init failed', details: error.message });
    }
}

export default allowCors(handler);
