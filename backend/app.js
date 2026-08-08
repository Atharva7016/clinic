/**
 * Express application configuration (MVC entry for middleware + routes).
 * Listening is handled in server.js after DB connects.
 */
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';

import env from './config/env.js';
import apiRoutes from './routes/index.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';
import sanitizeInput from './middleware/sanitizeInput.js';
import { apiLimiter } from './middleware/rateLimiter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Trust proxy when behind Render / Nginx / load balancer
app.set('trust proxy', Number(process.env.TRUST_PROXY ?? 1));

// -----------------------------------------------------------------------------
// Security
// -----------------------------------------------------------------------------
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

const allowedOrigins = env.frontendUrl
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Non-browser clients (Postman) send no Origin
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      // Dev convenience: allow any localhost Vite port (5173, 5174, …)
      if (
        !env.isProd &&
        /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)
      ) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
    credentials: true,
  })
);

// -----------------------------------------------------------------------------
// Parsers, compression, sanitization, logging
// -----------------------------------------------------------------------------
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(
  mongoSanitize({
    replaceWith: '_',
  })
);
app.use(sanitizeInput);

app.use(morgan(env.isProd ? 'combined' : 'dev'));

// -----------------------------------------------------------------------------
// Static files — uploads + public
// -----------------------------------------------------------------------------
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------
app.use('/api', apiLimiter, apiRoutes);

app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Shree Vishwa Prabha Ayurved Clinic API',
    data: {
      health: '/api/health',
      version: '1.0.0',
    },
  });
});

// -----------------------------------------------------------------------------
// 404 + error handler
// -----------------------------------------------------------------------------
app.use(notFound);
app.use(errorHandler);

export default app;
