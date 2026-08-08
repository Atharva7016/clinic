/**
 * Fail fast when required production environment variables are missing.
 */
import logger from '../utils/logger.js';

const REQUIRED_ALWAYS = ['MONGODB_URI', 'JWT_SECRET'];

const REQUIRED_IN_PROD = [
  'FRONTEND_URL',
  'CLINIC_EMAIL',
  'ADMIN_EMAIL',
];

export function validateEnv() {
  const missing = REQUIRED_ALWAYS.filter((key) => !process.env[key]?.trim());

  if (process.env.NODE_ENV === 'production') {
    for (const key of REQUIRED_IN_PROD) {
      if (!process.env[key]?.trim()) missing.push(key);
    }

    if (process.env.JWT_SECRET === 'change_this_to_a_long_random_secret') {
      missing.push('JWT_SECRET (must not use the example placeholder)');
    }
  }

  if (missing.length) {
    const message = `Missing or invalid environment variables: ${missing.join(', ')}`;
    logger.error(message);
    throw new Error(message);
  }

  if ((process.env.JWT_SECRET || '').length < 16) {
    logger.error('JWT_SECRET should be at least 16 characters');
    throw new Error('JWT_SECRET is too short');
  }
}

export default validateEnv;
