# Shree VishwaPrabha Ayurved Clinic

The **Shree VishwaPrabha Ayurved Clinic** web application is a production-ready full-stack project built using the **MERN stack**, with a strong emphasis on frontend polish, patient experience, and practical clinic operations. It demonstrates a complete digital presence for an Ayurvedic clinic — from a bilingual public website to a secure admin panel for day-to-day management.

Designed for **Shree VishwaPrabha Ayurved And Panchakarma Clinic** (Thane) under **Dr. Gauri Patil (BAMS, MD(Ayu))**, the platform helps patients explore treatments, book appointments, and connect via WhatsApp, while clinic staff manage bookings, messages, gallery, and content from one place.

## Highlights

- Responsive, mobile-first public website with smooth animations and clear CTAs
- English / Marathi language switch for accessibility across the site
- Online appointment booking with validation, email alerts, Excel export, and optional Google Sheets sync
- WhatsApp consultation shortcuts and Google Maps clinic location
- Admin dashboard for appointments, contact messages, treatments, testimonials, gallery, and settings
- SEO-ready pages (meta tags, Open Graph, JSON-LD) and production-minded security (JWT, bcrypt, rate limits, input sanitization)

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, Vite, Tailwind CSS, React Router, Axios, Framer Motion |
| Backend | Node.js, Express, MongoDB, Mongoose, JWT, Nodemailer |
| Hosting (recommended) | Vercel (frontend) · Render (API) · MongoDB Atlas (database) |

## Folder structure

```
clinic/
├── Frontend/                 # Public site + /admin panel
│   ├── public/               # robots.txt, sitemap.xml, favicon, manifest
│   ├── src/
│   │   ├── admin/            # Admin auth, pages, layout
│   │   ├── components/       # UI sections, SEO, ErrorBoundary, GA
│   │   ├── pages/            # Public routes
│   │   ├── services/         # Axios API client
│   │   ├── i18n/             # EN / Marathi translations
│   │   └── data/clinic.js    # Clinic constants
│   └── vercel.json
├── backend/                  # REST API (MVC)
│   ├── config/               # env, db, validateEnv
│   ├── controllers/
│   ├── middleware/           # auth, rate limit, sanitize, errors
│   ├── models/
│   ├── routes/
│   ├── services/             # email, Excel, Google Sheets
│   ├── utils/                # seed scripts, tokens, logger
│   └── render.yaml
└── README.md
```

## Quick start (local)

### Prerequisites

- Node.js 18+
- MongoDB locally **or** a MongoDB Atlas URI

### 1. Backend

```bash
cd backend
# Create a local .env (do not commit secrets)
npm install
npm run seed:admin
npm run seed:clinic
npm run dev
```

API defaults to `http://localhost:5001`  
Health: `GET /api/health`

### 2. Frontend

```bash
cd Frontend
# Create a local .env with VITE_API_URL=http://localhost:5001/api
npm install
npm run dev
```

App: `http://localhost:5173` (or next free port)  
Admin: `/admin/login`

**Admin login** uses the `ADMIN_EMAIL` / `ADMIN_PASSWORD` values from your local backend `.env` (seed with `npm run seed:admin`).

## Scripts

| Location | Command | Purpose |
|----------|---------|---------|
| backend | `npm run dev` | Watch mode API |
| backend | `npm start` | Production API |
| backend | `npm run seed:admin` | Create/reset admin user |
| backend | `npm run seed:clinic` | Seed doctor + clinic settings |
| Frontend | `npm run dev` | Vite dev server |
| Frontend | `npm run build` | Production bundle |
| Frontend | `npm run preview` | Preview production build |
| both | `npm run lint` | ESLint |

## Features

- Public marketing site (hero, treatments, Panchakarma, gallery, testimonials, FAQ, appointment & contact)
- Bilingual UI (English / Marathi)
- WhatsApp floating CTA + post-booking prompt
- Google Maps embed
- Email notifications (appointment + contact) when SMTP is configured
- Appointment sync to Excel / optional Google Sheets webhook
- Admin panel: dashboard, appointments, messages, gallery, treatments, testimonials, doctor profile, clinic settings
- SEO: Helmet meta, Open Graph, Twitter cards, JSON-LD (MedicalClinic / LocalBusiness / Physician), robots.txt, sitemap
- Security: Helmet, CORS, rate limits, mongo-sanitize, XSS scrubbing, JWT + bcrypt
- Resilience: ErrorBoundary, offline banner, 404 / 500 pages, loading skeletons

## License

Private clinic project — all rights reserved unless otherwise stated.
