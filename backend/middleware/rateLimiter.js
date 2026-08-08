/**
 * Rate limiters for public and auth endpoints.
 */
import rateLimit from 'express-rate-limit';

/** General API limiter */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests — please try again later',
    data: null,
  },
});

/** Stricter limiter for public form submissions */
export const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many form submissions — please try again later',
    data: null,
  },
});

/** Auth login limiter */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts — please try again later',
    data: null,
  },
});

export default { apiLimiter, formLimiter, authLimiter };
