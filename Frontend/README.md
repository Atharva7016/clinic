# Frontend — Shree Vishwa Prabha Ayurved Clinic

Premium React UI for the clinic website (Phase 2 — frontend only).

## Folder structure

```
src/
├── api/                 # Axios instance (configured, not wired to forms yet)
├── assets/
│   ├── images/          # Local images (placeholders use Unsplash for now)
│   └── icons/           # SVG logo mark
├── components/
│   ├── Navbar/
│   ├── Footer/
│   ├── Hero/
│   ├── Statistics/
│   ├── AboutDoctor/
│   ├── Treatments/
│   ├── WhyChooseUs/
│   ├── Panchakarma/
│   ├── Gallery/
│   ├── Testimonials/
│   ├── FAQ/
│   ├── AppointmentCTA/
│   ├── ContactCTA/
│   ├── ScrollToTop/
│   ├── Loader/
│   ├── SEO/
│   ├── SectionHeading/
│   └── PageHero/
├── context/             # ClinicProvider
├── data/                # Clinic constants + content catalogues
├── hooks/
├── layouts/             # MainLayout
├── pages/               # Home, About, Treatments, …
├── routes/              # Lazy-loaded AppRoutes
├── services/
├── styles/
├── utils/
├── App.jsx
├── main.jsx
└── index.css
```

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — ESLint

## Phase 4 — API integration

Frontend talks to Express via `src/services/api.js` using `VITE_API_URL`.

### Local

```bash
# terminal 1
cd backend && npm run dev

# terminal 2
cd frontend && npm run dev
```

### Production API URL

In `frontend/.env` (rebuild after changing):

```
VITE_API_URL=https://api.yourdomain.com/api
```

### Connected endpoints

| UI | Method | Path |
|----|--------|------|
| Appointment form | POST | `/appointments` |
| Contact form | POST | `/contact` |
| Treatments | GET | `/treatments` |
| Gallery | GET | `/gallery` |
| Testimonials | GET | `/testimonials` |
