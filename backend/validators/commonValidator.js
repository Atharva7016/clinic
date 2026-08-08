/**
 * Gallery & testimonial validators.
 */
import { body, param } from 'express-validator';

export const createGalleryRules = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn([
      'Clinic',
      'Doctor',
      'Medicines',
      'Panchakarma',
      'Reception',
      'Treatment',
      'Treatment Rooms',
      'Other',
    ])
    .withMessage('Invalid gallery category'),
  body('image').optional().trim().isString(),
];

export const galleryIdParam = [
  param('id').isMongoId().withMessage('Invalid gallery id'),
];

export const createTestimonialRules = [
  body('patientName').trim().notEmpty().withMessage('Patient name is required'),
  body('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5')
    .toInt(),
  body('review').trim().notEmpty().withMessage('Review is required').isLength({ max: 1000 }),
  body('photo').optional().trim().isString(),
  body('isPublished').optional().isBoolean().toBoolean(),
];

export const testimonialIdParam = [
  param('id').isMongoId().withMessage('Invalid testimonial id'),
];

export const loginRules = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Enter a valid email')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

export default {
  createGalleryRules,
  galleryIdParam,
  createTestimonialRules,
  testimonialIdParam,
  loginRules,
};
