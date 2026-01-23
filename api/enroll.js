import { sql } from '@vercel/postgres';
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
    // Shared Token Verification
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    let userId, userRole;
    try {
        const jwtSecret = process.env.JWT_SECRET || "greyhales_academy_secret_key_2024";
        const decoded = jwt.verify(token, jwtSecret);
        userId = decoded.id;
        userRole = decoded.role;
    } catch (err) {
        return res.status(401).json({ error: 'Failed to authenticate token' });
    }

    if (req.method === 'GET') {
        try {
            const { rows } = await sql`SELECT * FROM enrollments ORDER BY created_at DESC`;
            // Optional: Filter by user ID if not admin?
            // For now, mirroring original behavior
            res.status(200).json(rows);
        } catch (error) {
            console.error('Fetch error:', error);
            res.status(500).json({ error: 'Failed to fetch enrollments' });
        }
    } else if (req.method === 'POST') {
        try {
            const { firstName, lastName, phone, address, email, course } = req.body;
            await sql`
                INSERT INTO enrollments (user_id, first_name, last_name, phone, address, email, course)
                VALUES (${userId}, ${firstName}, ${lastName}, ${phone}, ${address}, ${email}, ${course})
            `;
            res.status(201).json({ message: 'Enrollment successful' });
        } catch (error) {
            console.error('Enrollment error:', error);
            res.status(400).json({ error: 'Failed to enroll' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}

export default allowCors(handler);
