/**
 * 404 handler for unmatched routes — forwards to global errorHandler.
 */
import AppError from '../utils/AppError.js';

const notFound = (req, _res, next) => {
  next(new AppError(`Not Found — ${req.method} ${req.originalUrl}`, 404));
};

export default notFound;
