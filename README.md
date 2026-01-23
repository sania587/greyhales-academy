# Greyhales Academy

A modern, responsive educational platform for online courses and student enrollment. This project features a React-based frontend and a serverless backend powered by Vercel Functions and Postgres.

## 🚀 Status
- **Live URL:** [https://www.greyhalesacademy.com](https://www.greyhalesacademy.com) (or [https://greyhales-academy.vercel.app](https://greyhales-academy.vercel.app))
- **Deployment:** Vercel (Zero Config)

## 🛠️ Technology Stack

### Frontend
- **React.js** (v19) - Component-based UI library
- **Vite** - High-performance build tool
- **Tailwind CSS** (v4) - Utility-first styling
- **Lucide React** - Modern icons

### Backend (Serverless)
- **Vercel API Routes** (`/api/*`) - Serverless Node.js functions
- **Vercel Postgres** - SQL Database (Neon)
- **Authentication** - JWT (JSON Web Tokens) & Bcrypt password hashing
- **CORS** - Native header handling in serverless functions

## 📂 Project Structure

```bash
/
├── api/                  # Vercel Serverless Functions (Backend)
│   ├── auth/             # Login & Register endpoints
│   ├── enroll.js         # Enrollment logic
│   ├── init-db.js        # Database setup script
│   └── debug-db.js       # Connection test tool
├── src/                  # React Frontend Source
│   ├── components/       # Reusable UI components
│   ├── pages/            # Main page views
│   └── config/           # API configuration
├── public/               # Static assets
└── vercel.json           # Vercel deployment configuration
```

## ⚙️ Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/greyhales-academy.git
   cd greyhales-academy
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   # Frontend
   VITE_API_URL=http://localhost:3000

   # Database (Get these from Vercel Dashboard)
   POSTGRES_URL="postgres://..."
   POSTGRES_USER="..."
   POSTGRES_HOST="..."
   POSTGRES_PASSWORD="..."
   POSTGRES_DATABASE="..."
   
   # Security
   JWT_SECRET="your_secret_key"
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:5173`.

   *Note: To test backend functions locally, you may need `vercel dev` instead of `vite` alone, or point the frontend to the live Vercel backend.*

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create a new user account |
| POST | `/api/auth/login` | Authenticate and receive JWT |
| GET | `/api/enroll` | View enrollments (Admin/Auth required) |
| POST | `/api/enroll` | Submit a new enrollment |
| GET | `/api/init-db` | **Admin:** Initialize/Repair database tables |
| GET | `/api/debug-db` | **Debug:** Test database connection |

## 🚀 Deployment

The project is configured for **Vercel Zero Config** deployment.

1. Push to GitHub `main` branch.
2. Connect the repository in Vercel.
3. Add the **Vercel Postgres** integration in the Storage tab.
4. Deployment will trigger automatically.

### Database Initialization
On the first deployment, you must visit:
`https://your-domain.com/api/init-db`
This creates the necessary `users` and `enrollments` tables.

## 📝 Important Notes
- **CORS:** The API is configured to accept requests from any origin (`*`) with token-based authentication.
- **Routing:** The `vercel.json` ensures Single Page Application (SPA) routing works by rewriting non-API paths to `index.html`.

---
© 2026 Greyhales Academy
