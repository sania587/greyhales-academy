const express = require('express');
const cors = require('cors');
const { sql } = require('@vercel/postgres');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Database Tables
async function initDB() {
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
        console.log('Database tables verified/created');
        seedAdmin();
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

// Admin Seeding Function
const seedAdmin = async () => {
    try {
        const { rows } = await sql`SELECT * FROM users WHERE role = 'admin' LIMIT 1`;
        if (rows.length === 0) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await sql`
                INSERT INTO users (name, email, password, role)
                VALUES ('admin', 'admin@example.com', ${hashedPassword}, 'admin')
            `;
            console.log('Admin user seeded successfully');
        }
    } catch (error) {
        console.error('Error seeding admin:', error);
    }
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const jwtSecret = process.env.JWT_SECRET || "greyhales_academy_secret_key_2024";
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Failed to authenticate token' });
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
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
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`;
        const user = rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const jwtSecret = process.env.JWT_SECRET || "greyhales_academy_secret_key_2024";
        const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.error('Login error details:', error);
        res.status(500).json({ error: 'Internal server error during login', details: error.message });
    }
});

// Enrollment Routes
app.post('/api/enroll', verifyToken, async (req, res) => {
    try {
        const { firstName, lastName, phone, address, email, course } = req.body;

        await sql`
            INSERT INTO enrollments (user_id, first_name, last_name, phone, address, email, course)
            VALUES (${req.userId}, ${firstName}, ${lastName}, ${phone}, ${address}, ${email}, ${course})
        `;

        res.status(201).json({ message: 'Enrollment successful' });
    } catch (error) {
        console.error('Enrollment error:', error);
        res.status(400).json({ error: 'Failed to enroll' });
    }
});

app.get('/api/enroll', verifyToken, async (req, res) => {
    // Optional: Check for admin role here if needed
    try {
        const { rows } = await sql`SELECT * FROM enrollments ORDER BY created_at DESC`;
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch enrollments' });
    }
});

app.get('/api/init-db', async (req, res) => {
    try {
        await initDB();
        res.json({ message: 'Database initialization attempted. Check logs for details.' });
    } catch (error) {
        res.status(500).json({ error: 'Init failed', details: error.message });
    }
});

app.get('/api/debug-db', async (req, res) => {
    try {
        // Log environment status (safety mask the password)
        const hasUrl = !!process.env.POSTGRES_URL;
        console.log('Debug: Checking DB connection. Has POSTGRES_URL:', hasUrl);

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
            stack: error.stack,
            env_check: { has_postgres_url: !!process.env.POSTGRES_URL }
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // We still try to init on listen, but since Vercel might skip this, 
    // the /api/init-db route is the backup.
    initDB();
});

module.exports = app;
