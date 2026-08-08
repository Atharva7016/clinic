/**
 * Appointment request validators (express-validator).
 */
import { body, param } from 'express-validator';

export const createAppointmentRules = [
  body('patientName')
    .trim()
    .notEmpty()
    .withMessage('Patient name is required')
    .isLength({ max: 100 })
    .withMessage('Patient name is too long')
    .matches(/^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/)
    .withMessage(
      'Patient name must contain letters only, with each word starting with a capital letter'
    ),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone is required')
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone must be a 10-digit number'),
  body('email')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage('Enter a valid email')
    .normalizeEmail(),
  body('age')
    .notEmpty()
    .withMessage('Age is required')
    .isInt({ min: 1, max: 99 })
    .withMessage('Age must be between 1 and 99')
    .toInt(),
  body('gender')
    .trim()
    .notEmpty()
    .withMessage('Gender is required')
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be male, female, or other'),
  body('disease').trim().notEmpty().withMessage('Disease / concern is required'),
  body('preferredDate')
    .notEmpty()
    .withMessage('Preferred date is required')
    .isISO8601()
    .withMessage('Preferred date must be a valid date')
    .toDate(),
  body('preferredTime').optional({ checkFalsy: true }).trim().isString(),
  body('notes').optional({ checkFalsy: true }).trim().isString(),
];

export const updateAppointmentRules = [
  param('id').isMongoId().withMessage('Invalid appointment id'),
  body('patientName').optional().trim().notEmpty().isLength({ max: 100 })
    .matches(/^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/)
    .withMessage(
      'Patient name must contain letters only, with each word starting with a capital letter'
    ),
  body('phone')
    .optional()
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone must be a 10-digit number'),
  body('email')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage('Enter a valid email')
    .normalizeEmail(),
  body('age')
    .optional()
    .isInt({ min: 1, max: 99 })
    .withMessage('Age must be between 1 and 99')
    .toInt(),
  body('gender')
    .optional()
    .trim()
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be male, female, or other'),
  body('disease').optional().trim().notEmpty(),
  body('preferredDate')
    .optional()
    .isISO8601()
    .withMessage('Preferred date must be a valid date')
    .toDate(),
  body('preferredTime').optional({ checkFalsy: true }).trim().isString(),
  body('status')
    .optional()
    .isIn(['pending', 'confirmed', 'completed', 'cancelled'])
    .withMessage('Invalid status'),
  body('notes').optional({ checkFalsy: true }).trim().isString(),
];

export const idParamRule = [
  param('id').isMongoId().withMessage('Invalid resource id'),
];

export default { createAppointmentRules, updateAppointmentRules, idParamRule };
