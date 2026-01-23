import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const { rows: existingUsers } = await sql`SELECT * FROM users WHERE email = ${email}`;
        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const { rows: newUsers } = await sql`
            INSERT INTO users (name, email, password, role)
            VALUES (${name}, ${email}, ${hashedPassword}, 'user')
            RETURNING id, name, email, role
        `;
        const user = newUsers[0];

        const jwtSecret = process.env.JWT_SECRET || "greyhales_academy_secret_key_2024";
        const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: '1d' });
        res.status(201).json({ token, user });
    } catch (error) {
        console.error('Registration error details:', error);
        res.status(500).json({ error: 'Internal server error during registration', details: error.message });
    }
}

export default allowCors(handler);
