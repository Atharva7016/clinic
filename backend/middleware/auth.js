/**
 * JWT authentication middleware.
 * Expects: Authorization: Bearer <token>
 */
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';
import { verifyToken } from '../utils/token.js';

const protect = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization;
  let token;

  if (header && header.startsWith('Bearer ')) {
    token = header.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new AppError('Not authorized — token missing', 401);
  }

  const decoded = verifyToken(token);
  const user = await User.findById(decoded.id).select('-password');

  if (!user || !user.isActive) {
    throw new AppError('Not authorized — user not found', 401);
  }

  req.user = user;
  next();
});

export default protect;
