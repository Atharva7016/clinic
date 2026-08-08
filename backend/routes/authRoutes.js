/**
 * Auth routes — login / logout / me.
 */
import { Router } from 'express';
import { login, logout, getMe } from '../controllers/authController.js';
import { loginRules } from '../validators/commonValidator.js';
import validate from '../middleware/validate.js';
import protect from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/login', authLimiter, loginRules, validate, login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

export default router;
