/**
 * Contact form validators — name, phone, message required; email & subject optional.
 */
import { body, param } from 'express-validator';

export const createContactRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone is required')
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone must be exactly 10 digits'),
  body('email')
    .optional({ values: 'falsy' })
    .trim()
    .isEmail()
    .withMessage('Enter a valid email')
    .normalizeEmail(),
  body('subject').optional({ values: 'falsy' }).trim().isLength({ max: 200 }),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: 2000 }),
];

export const contactIdParam = [
  param('id').isMongoId().withMessage('Invalid contact id'),
];

export default { createContactRules, contactIdParam };
