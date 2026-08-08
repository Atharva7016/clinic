/**
 * Appointment controllers — public create; admin list/update/delete.
 * On create: persist + notify patient/clinic via email (SMTP errors are non-fatal).
 */
import Appointment from '../models/Appointment.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { notifyAppointmentBooked } from '../services/emailService.js';
import {
  appendAppointmentToExcel,
  getAppointmentsExcelPath,
  appointmentsExcelExists,
  rebuildAppointmentsExcel,
} from '../services/appointmentExcel.js';
import { appendAppointmentToGoogleSheet } from '../services/googleSheets.js';
import {
  buildWhatsAppUrl,
  buildAppointmentWhatsAppText,
} from '../utils/whatsapp.js';
import logger from '../utils/logger.js';

/**
 * POST /api/appointments — public booking
 */
export const createAppointment = asyncHandler(async (req, res) => {
  // Allowlist fields — never trust client-provided status
  const appointment = await Appointment.create({
    patientName: req.body.patientName,
    phone: req.body.phone,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender,
    disease: req.body.disease,
    preferredDate: req.body.preferredDate,
    preferredTime: req.body.preferredTime,
    notes: req.body.notes,
    status: 'pending',
  });

  // Fire-and-report email notifications (do not fail the booking on SMTP issues)
  let emailResults = null;
  try {
    emailResults = await notifyAppointmentBooked(appointment);
  } catch (error) {
    logger.error('Appointment email notification failed:', error.message);
    emailResults = { error: error.message };
  }

  // Append to local Excel (non-fatal)
  let excelResult = null;
  try {
    excelResult = await appendAppointmentToExcel(appointment);
  } catch (error) {
    logger.error('Appointment Excel write failed:', error.message);
    excelResult = { ok: false, error: error.message };
  }

  // Live append to Google Sheet like Google Forms (non-fatal)
  let sheetResult = null;
  try {
    sheetResult = await appendAppointmentToGoogleSheet(appointment);
  } catch (error) {
    logger.error('Google Sheets write failed:', error.message);
    sheetResult = { ok: false, error: error.message };
  }

  const whatsappUrl = buildWhatsAppUrl({
    text: buildAppointmentWhatsAppText(appointment),
  });

  return sendSuccess(res, {
    statusCode: 201,
    message: 'Appointment request submitted successfully',
    data: {
      appointment,
      notifications: emailResults,
      excel: excelResult?.ok ? { saved: true } : { saved: false },
      googleSheet: sheetResult?.ok
        ? { saved: true }
        : { saved: false, skipped: Boolean(sheetResult?.skipped) },
      whatsappUrl,
    },
  });
});

/** GET /api/appointments — admin list with optional status filter */
export const getAppointments = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) {
    filter.status = req.query.status;
  }

  const appointments = await Appointment.find(filter).sort({ createdAt: -1 });

  return sendSuccess(res, {
    message: 'Appointments fetched successfully',
    data: appointments,
    meta: { count: appointments.length },
  });
});

/** GET /api/appointments/:id */
export const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    throw new AppError('Appointment not found', 404);
  }

  return sendSuccess(res, {
    message: 'Appointment fetched successfully',
    data: appointment,
  });
});

/** PUT /api/appointments/:id */
export const updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!appointment) {
    throw new AppError('Appointment not found', 404);
  }

  return sendSuccess(res, {
    message: 'Appointment updated successfully',
    data: appointment,
  });
});

/** DELETE /api/appointments/:id */
export const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);

  if (!appointment) {
    throw new AppError('Appointment not found', 404);
  }

  return sendSuccess(res, {
    message: 'Appointment deleted successfully',
    data: appointment,
  });
});

/**
 * GET /api/admin/appointments/export
 * Download appointments.xlsx (rebuild from DB so status updates are included).
 */
export const exportAppointmentsExcel = asyncHandler(async (_req, res) => {
  const appointments = await Appointment.find().sort({ createdAt: -1 });
  await rebuildAppointmentsExcel(appointments);

  if (!appointmentsExcelExists()) {
    throw new AppError('Excel file could not be created', 500);
  }

  const filePath = getAppointmentsExcelPath();
  res.download(filePath, 'appointments.xlsx');
});