/**
 * Global Express error-handling middleware (4-arg signature required).
 */
import logger from '../utils/logger.js';
import env from '../config/env.js';

const errorHandler = (err, req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let errors = err.errors || null;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `Duplicate value for ${field}`;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    message = 'Validation failed';
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  // Multer file size / type
  if (err.code === 'LIMIT_FILE_SIZE') {
    statusCode = 400;
    message = 'File too large. Max size is 5MB';
  }

  if (statusCode >= 500) {
    logger.error(err);
  } else {
    logger.warn(`${statusCode} — ${message}`);
  }

  res.status(statusCode).json({
    success: false,
    message:
      statusCode >= 500 && env.isProd ? 'Internal server error' : message,
    data: null,
    ...(errors ? { errors } : {}),
    ...(!env.isProd && statusCode >= 500 ? { stack: err.stack } : {}),
  });
};

export default errorHandler;
