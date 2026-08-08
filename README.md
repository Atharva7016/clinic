# Shree VishwaPrabha Ayurved Clinic — Full Stack

Production-oriented website and admin panel for **Shree VishwaPrabha Ayurved And Panchakarma Clinic** (Thane), featuring Dr. Gauri Patil (BAMS, MD(Ayu)).

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, Vite, Tailwind CSS, React Router, Axios, Framer Motion |
| Backend | Node.js, Express, MongoDB, Mongoose, JWT, Nodemailer |
| Hosting (recommended) | Vercel (frontend) · Render (API) · MongoDB Atlas (database) |

## Folder structure

```
clinic/
├── frontend/                 # Public site + /admin panel
│   ├── public/               # robots.txt, sitemap.xml, favicon, manifest
│   ├── src/
│   │   ├── admin/            # Admin auth, pages, layout
│   │   ├── components/       # UI sections, SEO, ErrorBoundary, GA
│   │   ├── pages/            # Public routes
│   │   ├── services/         # Axios API client
│   │   └── data/clinic.js    # Clinic constants
│   └── vercel.json
├── backend/                  # REST API (MVC)
│   ├── config/               # env, db, validateEnv
│   ├── controllers/
│   ├── middleware/           # auth, rate limit, sanitize, errors
│   ├── models/
│   ├── routes/
│   ├── services/             # email
│   ├── utils/                # seed scripts, tokens, logger
│   └── render.yaml
├── docs/
│   ├── DEPLOYMENT.md
│   ├── API.md
│   ├── ENV.md
│   ├── ADMIN_GUIDE.md
│   └── PRODUCTION_CHECKLIST.md
└── README.md
```

## Quick start (local)

### Prerequisites

- Node.js 18+
- MongoDB locally **or** a MongoDB Atlas URI

### 1. Backend

```bash
cd backend
cp .env.example .env
# Edit MONGODB_URI, JWT_SECRET, ADMIN_*, EMAIL_* as needed
npm install
npm run seed:admin
npm run seed:clinic
npm run dev
```

API defaults to `http://localhost:5001`  
Health: `GET /api/health`

### 2. Frontend

```bash
cd frontend
cp .env.example .env
# Set VITE_API_URL=http://localhost:5001/api
npm install
npm run dev
```

App: `http://localhost:5173` (or next free port)  
Admin: `/admin/login`

**Default admin (from `.env`):**

- Email: value of `ADMIN_EMAIL`
- Password: value of `ADMIN_PASSWORD` (re-sync with `npm run seed:admin`)

## Scripts

| Location | Command | Purpose |
|----------|---------|---------|
| backend | `npm run dev` | Watch mode API |
| backend | `npm start` | Production API |
| backend | `npm run seed:admin` | Create/reset admin user |
| backend | `npm run seed:clinic` | Seed doctor + clinic settings |
| frontend | `npm run dev` | Vite dev server |
| frontend | `npm run build` | Production bundle |
| frontend | `npm run preview` | Preview production build |
| both | `npm run lint` | ESLint |

## Features

- Public marketing site (hero, treatments, Panchakarma, gallery, testimonials, FAQ, appointment & contact)
- WhatsApp floating CTA + post-booking prompt
- Google Maps embed
- Email notifications (appointment + contact) when SMTP is configured
- Admin panel: dashboard, appointments, messages, gallery, treatments, testimonials, doctor profile, clinic settings
- SEO: Helmet meta, Open Graph, Twitter cards, JSON-LD (MedicalClinic / LocalBusiness / Physician), robots.txt, sitemap
- Security: Helmet, CORS, rate limits, mongo-sanitize, XSS scrubbing, JWT + bcrypt
- Resilience: ErrorBoundary, offline banner, 404 / 500 pages, loading skeletons

## Documentation

- [Deployment Guide](docs/DEPLOYMENT.md)
- [API Documentation](docs/API.md)
- [Environment Variables](docs/ENV.md)
- [Admin Guide](docs/ADMIN_GUIDE.md)
- [Production Checklist](docs/PRODUCTION_CHECKLIST.md)

## License

Private clinic project — all rights reserved unless otherwise stated.
