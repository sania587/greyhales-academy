import { sql } from '@vercel/postgres';

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
        const hasUrl = !!process.env.POSTGRES_URL;
        const result = await sql`SELECT NOW()`;
        res.json({
            message: 'Database connected successfully',
            time: result.rows[0],
            env_check: { has_postgres_url: hasUrl }
        });
    } catch (error) {
        console.error('Database connection test failed:', error);
        res.status(500).json({
            error: 'Database connection failed',
            details: error.message,
            env_check: { has_postgres_url: !!process.env.POSTGRES_URL }
        });
    }
}

export default allowCors(handler);
