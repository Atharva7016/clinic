/**
 * Contact routes.
 * Public: POST
 * Protected: GET, DELETE/:id
 */
import { Router } from 'express';
import {
  createContact,
  getContacts,
  deleteContact,
} from '../controllers/contactController.js';
import {
  createContactRules,
  contactIdParam,
} from '../validators/contactValidator.js';
import validate from '../middleware/validate.js';
import protect from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import { formLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', formLimiter, createContactRules, validate, createContact);

router.use(protect, authorize('admin', 'staff'));

router.get('/', getContacts);
router.delete('/:id', contactIdParam, validate, deleteContact);

export default router;
