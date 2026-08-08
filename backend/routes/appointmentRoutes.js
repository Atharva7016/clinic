/**
 * Appointment routes.
 * Public: POST
 * Protected (admin): GET, GET/:id, PUT/:id, DELETE/:id
 */
import { Router } from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from '../controllers/appointmentController.js';
import {
  createAppointmentRules,
  updateAppointmentRules,
  idParamRule,
} from '../validators/appointmentValidator.js';
import validate from '../middleware/validate.js';
import protect from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import { formLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post(
  '/',
  formLimiter,
  createAppointmentRules,
  validate,
  createAppointment
);

router.use(protect, authorize('admin', 'staff'));

router.get('/', getAppointments);
router.get('/:id', idParamRule, validate, getAppointmentById);
router.put('/:id', updateAppointmentRules, validate, updateAppointment);
router.delete('/:id', idParamRule, validate, deleteAppointment);

export default router;
