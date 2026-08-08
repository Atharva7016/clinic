/**
 * Live append appointments to Google Sheets (Google Forms–style).
 * Uses a Google Apps Script Web App webhook URL from env.
 *
 * Note: Apps Script web apps respond with HTTP 302 after doPost runs.
 * We must NOT follow that redirect as GET (Node fetch would drop the body).
 * Treat 200–302 as success when the first request was accepted.
 */
import logger from '../utils/logger.js';

const formatDay = (value) => {
  if (!value) return '';
  try {
    return new Date(value).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return String(value);
  }
};

const formatDateTime = (value) => {
  if (!value) return '';
  try {
    return new Date(value).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return String(value);
  }
};

/**
 * Build the row payload the Apps Script expects.
 */
export function buildSheetRow(appointment) {
  return {
    bookedAt: formatDateTime(appointment.createdAt || new Date()),
    patientName: appointment.patientName || '',
    phone: appointment.phone || '',
    email: appointment.email || '',
    age: appointment.age ?? '',
    gender: appointment.gender || '',
    disease: appointment.disease || '',
    preferredDate: formatDay(appointment.preferredDate),
    preferredTime: appointment.preferredTime || '',
    status: appointment.status || 'pending',
    notes: appointment.notes || '',
    appointmentId: String(appointment._id || ''),
  };
}

/**
 * Append one appointment to the linked Google Sheet.
 * No-op (ok: false, skipped) when webhook URL is not configured.
 */
export async function appendAppointmentToGoogleSheet(appointment) {
  const webhookUrl = (process.env.GOOGLE_SHEETS_WEBHOOK_URL || '').trim();

  if (!webhookUrl) {
    logger.warn('Google Sheets skipped — GOOGLE_SHEETS_WEBHOOK_URL not set');
    return { ok: false, skipped: true, reason: 'GOOGLE_SHEETS_WEBHOOK_URL not set' };
  }

  try {
    const payload = buildSheetRow(appointment);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    // text/plain avoids CORS preflight and works with e.postData.contents
    // redirect: 'manual' — Apps Script returns 302 AFTER doPost; following as GET loses the row
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'manual',
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const status = response.status;
    // 200 OK, 302 Moved (normal Apps Script success), 303 See Other
    const accepted = (status >= 200 && status < 300) || status === 302 || status === 303;

    if (!accepted) {
      const text = await response.text().catch(() => '');
      logger.error('Google Sheets webhook failed:', status, text.slice(0, 200));
      return { ok: false, status, error: text.slice(0, 200) };
    }

    logger.info(`Google Sheets row appended (${status}) for ${payload.patientName}`);
    return { ok: true, status };
  } catch (error) {
    logger.error('Google Sheets append failed:', error.message);
    return { ok: false, error: error.message };
  }
}

export default { appendAppointmentToGoogleSheet, buildSheetRow };
