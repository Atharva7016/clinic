/**
 * Gallery routes.
 * Public: GET
 * Protected: POST, DELETE/:id
 */
import { Router } from 'express';
import {
  getGallery,
  createGalleryItem,
  deleteGalleryItem,
} from '../controllers/galleryController.js';
import {
  createGalleryRules,
  galleryIdParam,
} from '../validators/commonValidator.js';
import validate from '../middleware/validate.js';
import protect from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import { uploadSingleImage } from '../middleware/upload.js';

const router = Router();

router.get('/', getGallery);

router.post(
  '/',
  protect,
  authorize('admin'),
  uploadSingleImage,
  createGalleryRules,
  validate,
  createGalleryItem
);

router.delete(
  '/:id',
  protect,
  authorize('admin'),
  galleryIdParam,
  validate,
  deleteGalleryItem
);

export default router;
