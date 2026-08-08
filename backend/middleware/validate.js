/**
 * Runs express-validator results and returns a consistent 400 payload.
 */
import { validationResult } from 'express-validator';
import AppError from '../utils/AppError.js';

const validate = (req, _res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const errors = result.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return next(new AppError('Validation failed', 400, errors));
  }

  return next();
};

export default validate;
