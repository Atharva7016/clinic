/**
 * Standardized API response helpers.
 * Always return: success, message, data (+ optional meta).
 */
export const sendSuccess = (
  res,
  { statusCode = 200, message = 'Success', data = null, meta } = {}
) => {
  const payload = {
    success: true,
    message,
    data,
  };

  if (meta !== undefined) {
    payload.meta = meta;
  }

  return res.status(statusCode).json(payload);
};

export const sendError = (
  res,
  { statusCode = 500, message = 'Something went wrong', errors = null } = {}
) => {
  const payload = {
    success: false,
    message,
    data: null,
  };

  if (errors) {
    payload.errors = errors;
  }

  return res.status(statusCode).json(payload);
};

export default { sendSuccess, sendError };
