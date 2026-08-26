/**
 * Appointment request validators (express-validator).
 * Name + phone required; all other fields optional.
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
    .optional({ checkFalsy: true })
    .isInt({ min: 1, max: 99 })
    .withMessage('Age must be between 1 and 99')
    .toInt(),
  body('gender')
    .optional({ checkFalsy: true })
    .trim()
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be male, female, or other'),
  body('disease').optional({ checkFalsy: true }).trim().isString(),
  body('preferredDate')
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage('Preferred date must be a valid date')
    .custom((value) => {
      const selected = new Date(value);
      if (Number.isNaN(selected.getTime())) {
        throw new Error('Preferred date must be a valid date');
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      selected.setHours(0, 0, 0, 0);
      if (selected < today) {
        throw new Error('Preferred date cannot be in the past');
      }
      return true;
    })
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
    .optional({ checkFalsy: true })
    .isInt({ min: 1, max: 99 })
    .withMessage('Age must be between 1 and 99')
    .toInt(),
  body('gender')
    .optional({ checkFalsy: true })
    .trim()
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be male, female, or other'),
  body('disease').optional({ checkFalsy: true }).trim().isString(),
  body('preferredDate')
    .optional({ checkFalsy: true })
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
