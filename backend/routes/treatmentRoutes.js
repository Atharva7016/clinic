/**
 * Treatment routes.
 * Public: GET, GET/:id
 * Protected: POST, PUT/:id, DELETE/:id
 */
import { Router } from 'express';
import {
  getTreatments,
  getTreatmentById,
  createTreatment,
  updateTreatment,
  deleteTreatment,
} from '../controllers/treatmentController.js';
import {
  createTreatmentRules,
  updateTreatmentRules,
  treatmentIdParam,
} from '../validators/treatmentValidator.js';
import validate from '../middleware/validate.js';
import protect from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import { uploadSingleImage } from '../middleware/upload.js';

const router = Router();

router.get('/', getTreatments);
router.get('/:id', getTreatmentById);

router.post(
  '/',
  protect,
  authorize('admin'),
  uploadSingleImage,
  createTreatmentRules,
  validate,
  createTreatment
);

router.put(
  '/:id',
  protect,
  authorize('admin'),
  uploadSingleImage,
  updateTreatmentRules,
  validate,
  updateTreatment
);

router.delete(
  '/:id',
  protect,
  authorize('admin'),
  treatmentIdParam,
  validate,
  deleteTreatment
);

export default router;
