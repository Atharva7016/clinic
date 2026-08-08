/**
 * Auth controllers — admin login / profile.
 */
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { signToken } from '../utils/token.js';

/** POST /api/auth/login */
export const login = asyncHandler(async (req, res) => {
  const { email, password, rememberMe } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }

  if (!user.isActive) {
    throw new AppError('Account is deactivated', 403);
  }

  const expiresIn = rememberMe ? '30d' : process.env.JWT_EXPIRES_IN || '7d';
  const token = signToken({ id: user._id, role: user.role }, expiresIn);

  const safeUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const maxAge = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge,
  });

  return sendSuccess(res, {
    message: 'Logged in successfully',
    data: { user: safeUser, token, expiresIn },
  });
});

/** GET /api/auth/me — requires protect */
export const getMe = asyncHandler(async (req, res) => {
  return sendSuccess(res, {
    message: 'Profile fetched successfully',
    data: req.user,
  });
});

/** POST /api/auth/logout */
export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie('token');
  return sendSuccess(res, {
    message: 'Logged out successfully',
    data: null,
  });
});
