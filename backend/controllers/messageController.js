/**
 * Contact message helpers for admin panel (mark read).
 */
import Contact from '../models/Contact.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';
import { sendSuccess } from '../utils/apiResponse.js';

/** GET /api/admin/messages/:id — also marks as read */
export const getMessageById = asyncHandler(async (req, res) => {
  const message = await Contact.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );

  if (!message) {
    throw new AppError('Message not found', 404);
  }

  return sendSuccess(res, {
    message: 'Message fetched successfully',
    data: message,
  });
});

/** PATCH /api/admin/messages/:id/read */
export const markMessageRead = asyncHandler(async (req, res) => {
  const message = await Contact.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );

  if (!message) {
    throw new AppError('Message not found', 404);
  }

  return sendSuccess(res, {
    message: 'Message marked as read',
    data: message,
  });
});
