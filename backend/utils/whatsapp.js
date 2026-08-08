/**
 * WhatsApp deep-link helpers (wa.me).
 * Number should be digits only with country code, e.g. 919876543210
 */
const DEFAULT_MESSAGE =
  'Hello Doctor,\n\nI would like to book an appointment.';

/**
 * Normalize a phone number to digits for wa.me links.
 * @param {string} number
 */
export const normalizeWhatsAppNumber = (number = '') =>
  String(number).replace(/[^\d]/g, '');

/**
 * Build a WhatsApp chat URL.
 * @param {object} options
 * @param {string} [options.number] - falls back to WHATSAPP_NUMBER env
 * @param {string} [options.text]
 */
export const buildWhatsAppUrl = ({
  number = process.env.WHATSAPP_NUMBER,
  text = DEFAULT_MESSAGE,
} = {}) => {
  const digits = normalizeWhatsAppNumber(number);
  if (!digits) {
    return null;
  }

  const encoded = encodeURIComponent(text);
  return `https://wa.me/${digits}?text=${encoded}`;
};

/**
 * Prefill message after a successful appointment booking.
 */
export const buildAppointmentWhatsAppText = (appointment) => {
  const date = appointment?.preferredDate
    ? new Date(appointment.preferredDate).toLocaleDateString('en-IN')
    : '';
  const time = appointment?.preferredTime || '';

  return [
    'Hello Doctor,',
    '',
    'I just booked an appointment on the website.',
    `Name: ${appointment?.patientName || ''}`,
    `Phone: ${appointment?.phone || ''}`,
    `Problem: ${appointment?.disease || ''}`,
    `Preferred Date: ${date}`,
    time ? `Preferred Time: ${time}` : null,
    '',
    'Please confirm my slot. Thank you!',
  ]
    .filter(Boolean)
    .join('\n');
};

/**
 * Prefill message after a contact form submission.
 */
export const buildContactWhatsAppText = (contact) =>
  [
    'Hello Doctor,',
    '',
    'I sent a message from the website contact form.',
    `Name: ${contact?.name || ''}`,
    `Phone: ${contact?.phone || ''}`,
    `Email: ${contact?.email || ''}`,
    `Subject: ${contact?.subject || ''}`,
    '',
    'Message:',
    contact?.message || '',
    '',
    'Please get back to me. Thank you!',
  ].join('\n');

const whatsappUtil = {
  normalizeWhatsAppNumber,
  buildWhatsAppUrl,
  buildAppointmentWhatsAppText,
  buildContactWhatsAppText,
  DEFAULT_MESSAGE,
};

export default whatsappUtil;
