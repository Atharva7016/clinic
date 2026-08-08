/**
 * Testimonial routes.
 * Public: GET
 * Protected: POST, DELETE/:id
 */
import { Router } from 'express';
import {
  createGalleryRules,
  galleryIdParam,
  createTestimonialRules,
  testimonialIdParam,
} from '../validators/commonValidator.js';
import validate from '../middleware/validate.js';
import protect from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import { uploadSinglePhoto } from '../middleware/upload.js';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';

const router = Router();

router.get('/', getTestimonials);

router.post(
  '/',
  protect,
  authorize('admin'),
  uploadSinglePhoto,
  createTestimonialRules,
  validate,
  createTestimonial
);

router.put(
  '/:id',
  protect,
  authorize('admin'),
  uploadSinglePhoto,
  testimonialIdParam,
  validate,
  updateTestimonial
);

router.delete(
  '/:id',
  protect,
  authorize('admin'),
  testimonialIdParam,
  validate,
  deleteTestimonial
);

export default router;
