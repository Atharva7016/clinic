/**
 * Public clinic metadata routes.
 */
import { Router } from 'express';
import { getClinicInfo } from '../controllers/clinicController.js';

const router = Router();

router.get('/info', getClinicInfo);

export default router;
