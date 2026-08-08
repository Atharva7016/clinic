/**
 * Treatment validators.
 */
import { body, param } from 'express-validator';

export const createTreatmentRules = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').optional().trim().isString(),
  body('image').optional().trim().isString(),
  body('isActive').optional().isBoolean().toBoolean(),
];

export const updateTreatmentRules = [
  param('id').isMongoId().withMessage('Invalid treatment id'),
  body('title').optional().trim().notEmpty(),
  body('description').optional().trim().notEmpty(),
  body('category').optional().trim().isString(),
  body('image').optional().trim().isString(),
  body('isActive').optional().isBoolean().toBoolean(),
];

export const treatmentIdParam = [
  param('id').isMongoId().withMessage('Invalid treatment id'),
];

export default {
  createTreatmentRules,
  updateTreatmentRules,
  treatmentIdParam,
};
