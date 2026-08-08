/**
 * Role-based authorization middleware.
 * Usage: authorize('admin')
 */
import AppError from '../utils/AppError.js';

const authorize =
  (...roles) =>
  (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AppError('Forbidden — insufficient permissions', 403)
      );
    }
    return next();
  };

export default authorize;
