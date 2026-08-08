/**
 * Sign and verify JWT tokens for admin authentication.
 */
import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import AppError from './AppError.js';

/**
 * @param {object} payload
 * @param {string} [expiresIn] - optional override (e.g. '30d' for Remember Me)
 * @returns {string}
 */
export const signToken = (payload, expiresIn) => {
  if (!env.jwtSecret) {
    throw new AppError('JWT_SECRET is not configured', 500);
  }

  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: expiresIn || env.jwtExpiresIn,
  });
};

/**
 * @param {string} token
 * @returns {object}
 */
export const verifyToken = (token) => {
  if (!env.jwtSecret) {
    throw new AppError('JWT_SECRET is not configured', 500);
  }

  try {
    return jwt.verify(token, env.jwtSecret);
  } catch {
    throw new AppError('Invalid or expired token', 401);
  }
};

export default { signToken, verifyToken };
