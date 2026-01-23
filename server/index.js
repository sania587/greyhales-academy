const express = require('express');
const { sql } = require('@vercel/postgres');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

/* =========================
   CORS FIX (Vercel Safe)
========================= */
const allowedOrigins = [
    "https://www.greyhalesacademy.com",
    "https://greyhalesacademy.com"
];

app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Handle preflight
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    next();
});

/* =========================
   Middleware
========================= */
app.use(express.json());

/* =========================
   Database Init
========================= */
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

        console.log("✅ Database tables verified");
        seedAdmin();
    } catch (error) {
        console.error("❌ DB init error:", error);
    }
}

/* =========================
   Seed Admin
========================= */
const seedAdmin = async () => {
    try {
        const { rows } = await sql`
            SELECT * FROM users WHERE role = 'admin' LIMIT 1
        `;

        if (rows.length === 0) {
            const hashedPassword = await bcrypt.hash("admin123", 10);

            await sql`
                INSERT INTO users (name, email, password, role)
                VALUES ('admin', 'admin@example.com', ${hashedPassword}, 'admin')
            `;

            console.log("✅ Admin user created");
        }
    } catch (error) {
        console.error(" Admin seed error:", error);
    }
};

/* =========================
   JWT Middleware
========================= */
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET || "greyhales_academy_secret_key_2024";

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token" });
        }

        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

/* =========================
   Auth Routes
========================= */
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const { rows: existing } = await sql`
            SELECT id FROM users WHERE email = ${email}
        `;

        if (existing.length > 0) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const { rows } = await sql`
            INSERT INTO users (name, email, password)
            VALUES (${name}, ${email}, ${hashedPassword})
            RETURNING id, name, email, role
        `;

        const user = rows[0];
        const jwtSecret = process.env.JWT_SECRET || "greyhales_academy_secret_key_2024";

        const token = jwt.sign(
            { id: user.id, role: user.role },
            jwtSecret,
            { expiresIn: "1d" }
        );

        res.status(201).json({ token, user });
    } catch (error) {
        console.error("❌ Register error:", error);
        res.status(500).json({ error: "Registration failed" });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password required" });
        }

        const { rows } = await sql`
            SELECT * FROM users WHERE email = ${email}
        `;

        const user = rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const jwtSecret = process.env.JWT_SECRET || "greyhales_academy_secret_key_2024";

        const token = jwt.sign(
            { id: user.id, role: user.role },
            jwtSecret,
            { expiresIn: "1d" }
        );

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ error: "Login failed" });
    }
});

/* =========================
   Enrollment Routes
========================= */
app.post('/api/enroll', verifyToken, async (req, res) => {
    try {
        const { firstName, lastName, phone, address, email, course } = req.body;

        await sql`
            INSERT INTO enrollments
            (user_id, first_name, last_name, phone, address, email, course)
            VALUES
            (${req.userId}, ${firstName}, ${lastName}, ${phone}, ${address}, ${email}, ${course})
        `;

        res.status(201).json({ message: "Enrollment successful" });
    } catch (error) {
        console.error("❌ Enrollment error:", error);
        res.status(400).json({ error: "Enrollment failed" });
    }
});

app.get('/api/enroll', verifyToken, async (req, res) => {
    try {
        const { rows } = await sql`
            SELECT * FROM enrollments ORDER BY created_at DESC
        `;
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch enrollments" });
    }
});

/* =========================
   DB Utilities
========================= */
app.get('/api/init-db', async (req, res) => {
    await initDB();
    res.json({ message: "DB init triggered" });
});

app.get('/api/debug-db', async (req, res) => {
    try {
        const result = await sql`SELECT NOW()`;
        res.json({ status: "connected", time: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: "DB connection failed" });
    }
});

/* =========================
   IMPORTANT FOR VERCEL
========================= */
module.exports = app;
