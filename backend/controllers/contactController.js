/**
 * Contact form controllers — store in MongoDB + email clinic.
 */
import Contact from '../models/Contact.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { notifyContactInquiry } from '../services/emailService.js';
import {
  buildContactWhatsAppText,
  buildWhatsAppUrl,
} from '../utils/whatsapp.js';
import logger from '../utils/logger.js';

/** POST /api/contact — public */
export const createContact = asyncHandler(async (req, res) => {
  const contact = await Contact.create(req.body);

  let emailResult = null;
  try {
    emailResult = await notifyContactInquiry(contact);
  } catch (error) {
    logger.error('Contact email notification failed:', error.message);
    emailResult = { sent: false, error: error.message };
  }

  const whatsappUrl = buildWhatsAppUrl({
    text: buildContactWhatsAppText(contact),
  });

  return sendSuccess(res, {
    statusCode: 201,
    message: 'Message sent successfully',
    data: {
      contact,
      notifications: { clinic: emailResult },
      whatsappUrl,
    },
  });
});

/** GET /api/contact — admin */
export const getContacts = asyncHandler(async (_req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });

  return sendSuccess(res, {
    message: 'Contact messages fetched successfully',
    data: contacts,
    meta: { count: contacts.length },
  });
});

/** DELETE /api/contact/:id — admin */
export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) {
    throw new AppError('Contact message not found', 404);
  }

  return sendSuccess(res, {
    message: 'Contact message deleted successfully',
    data: contact,
  });
});
