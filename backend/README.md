# Backend — Shree Vishwa Prabha Ayurved Clinic API

Production-ready Node.js + Express + MongoDB (Mongoose) API using **MVC architecture**.

## Architecture

```
Request → Middleware (security, parse, rate limit, validate, auth)
       → Routes
       → Controllers
       → Models / Services
       → Standardized JSON Response
```

```
backend/
├── config/           # DB connection, env helpers
├── controllers/      # Request handlers
├── middleware/       # Auth, upload, validation, errors, rate limit
├── models/           # Mongoose schemas
├── routes/           # Express routers
├── services/         # Email service (Nodemailer — ready, not auto-sent)
├── utils/            # AppError, asyncHandler, apiResponse, logger, JWT, seed
├── validators/       # express-validator rule sets
├── uploads/          # Multer image storage
├── public/           # Static public assets
├── app.js            # Express app wiring
├── server.js         # Entry: connect DB + listen
├── package.json
├── .env.example
└── README.md
```

## Major modules

| Module | Purpose |
|--------|---------|
| `config/db.js` | MongoDB Atlas/local connect with retry |
| `middleware/auth.js` | JWT protect |
| `middleware/authorize.js` | Role guard (`admin` / `staff`) |
| `middleware/upload.js` | Multer image uploads → `/uploads` |
| `middleware/validate.js` | express-validator result checker |
| `services/emailService.js` | Nodemailer helpers (no auto-send yet) |
| `utils/apiResponse.js` | `{ success, message, data }` helpers |
| `utils/asyncHandler.js` | Async error wrapper |

## API endpoints

### Public
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/appointments` | Book appointment |
| POST | `/api/contact` | Contact form |
| GET | `/api/treatments` | List treatments |
| GET | `/api/treatments/:id` | Treatment by id/slug |
| GET | `/api/gallery` | Gallery list |
| GET | `/api/testimonials` | Published testimonials |
| POST | `/api/auth/login` | Admin login |

### Protected (Bearer JWT)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/auth/me` | Current admin |
| GET/PUT/DELETE | `/api/appointments` | Manage appointments |
| GET/DELETE | `/api/contact` | Manage messages |
| POST/PUT/DELETE | `/api/treatments` | Manage treatments |
| POST/DELETE | `/api/gallery` | Manage gallery |
| POST/DELETE | `/api/testimonials` | Manage testimonials |

### Response shape

```json
{
  "success": true,
  "message": "Appointments fetched successfully",
  "data": [],
  "meta": { "count": 0 }
}
```

## Environment

```bash
cp .env.example .env
```

Set at minimum:

- `MONGODB_URI` — Atlas or local MongoDB
- `JWT_SECRET`
- `FRONTEND_URL` — CORS origin (e.g. `http://localhost:5173`)

Optional email vars (`EMAIL_*`, `CLINIC_EMAIL`) configure Nodemailer for a later phase.

## Run locally

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI + JWT_SECRET

# Ensure MongoDB is running (local) or Atlas URI is set
npm run seed:admin   # creates admin from ADMIN_* env vars
npm run dev          # http://localhost:5000
```

### Quick checks

```bash
curl http://localhost:5000/api/health

curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"YOUR_ADMIN_EMAIL\",\"password\":\"YOUR_ADMIN_PASSWORD\"}"
```

Use the returned `token` as `Authorization: Bearer <token>` for protected routes.

## Security included

- Helmet
- CORS (FRONTEND_URL)
- Rate limiting (API + forms + auth)
- express-mongo-sanitize
- express-validator on inputs
- bcrypt password hashing
- JWT auth + role authorization
- dotenv secrets (never commit `.env`)

## Notes

- Frontend is **not** connected in this phase.
- Email service builds/prepares messages but does **not** auto-send.
- Uploaded images are served from `/uploads/<filename>`.
