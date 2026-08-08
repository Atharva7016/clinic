/**
 * Frontend WhatsApp / Maps helpers using VITE_* env vars.
 */
import { CLINIC } from '../data/clinic';

const DEFAULT_MESSAGE =
  'Hello Doctor,\n\nI would like to book an appointment.';

/** Digits-only WhatsApp number with country code */
export const getWhatsAppNumber = () => {
  const fromEnv = import.meta.env.VITE_WHATSAPP_NUMBER;
  if (fromEnv) return String(fromEnv).replace(/[^\d]/g, '');
  return String(CLINIC.contact.whatsapp || '').replace(/[^\d]/g, '');
};

export const buildWhatsAppUrl = (text = DEFAULT_MESSAGE) => {
  const number = getWhatsAppNumber();
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
};

export const buildAppointmentWhatsAppText = (appointment = {}) => {
  const date = appointment.preferredDate
    ? new Date(appointment.preferredDate).toLocaleDateString('en-IN')
    : '';
  const time = appointment.preferredTime || '';

  return [
    'Hello Doctor,',
    '',
    'I just booked an appointment on the website.',
    `Name: ${appointment.patientName || ''}`,
    `Phone: ${appointment.phone || ''}`,
    `Problem: ${appointment.disease || ''}`,
    date ? `Preferred Date: ${date}` : null,
    time ? `Preferred Time: ${time}` : null,
    '',
    'Please confirm my slot. Thank you!',
  ]
    .filter(Boolean)
    .join('\n');
};

/** Marathi WhatsApp follow-up after booking */
export const buildAppointmentWhatsAppTextMr = (appointment = {}) => {
  const date = appointment.preferredDate
    ? new Date(appointment.preferredDate).toLocaleDateString('mr-IN')
    : '';
  const time = appointment.preferredTime || '';

  return [
    'नमस्कार डॉक्टर,',
    '',
    'मी वेबसाइटवरून अपॉइंटमेंट बुक केले आहे.',
    `नाव: ${appointment.patientName || ''}`,
    `फोन: ${appointment.phone || ''}`,
    `समस्या: ${appointment.disease || ''}`,
    date ? `पसंतीची तारीख: ${date}` : null,
    time ? `पसंतीची वेळ: ${time}` : null,
    '',
    'कृपया माझी वेळ निश्चित करा. धन्यवाद!',
  ]
    .filter(Boolean)
    .join('\n');
};

export const buildContactWhatsAppText = (contact = {}) =>
  [
    'Hello Doctor,',
    '',
    'I sent a message from the website contact form.',
    `Name: ${contact.name || ''}`,
    `Phone: ${contact.phone || ''}`,
    `Email: ${contact.email || ''}`,
    `Subject: ${contact.subject || ''}`,
    '',
    'Message:',
    contact.message || '',
    '',
    'Please get back to me. Thank you!',
  ].join('\n');

export const getGoogleMapEmbedUrl = () => {
  if (import.meta.env.VITE_GOOGLE_MAP_URL) {
    return import.meta.env.VITE_GOOGLE_MAP_URL;
  }
  const { mapLat, mapLng } = CLINIC.contact;
  if (mapLat != null && mapLng != null) {
    return `https://maps.google.com/maps?q=${mapLat},${mapLng}&z=17&output=embed`;
  }
  return `https://maps.google.com/maps?q=${encodeURIComponent(CLINIC.contact.address)}&z=15&output=embed`;
};

/** Opens the clinic listing in Google Maps (app or browser). */
export const getDirectionsUrl = () =>
  CLINIC.contact.mapLink ||
  (CLINIC.contact.mapLat != null && CLINIC.contact.mapLng != null
    ? `https://www.google.com/maps/search/?api=1&query=${CLINIC.contact.mapLat},${CLINIC.contact.mapLng}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CLINIC.contact.address)}`);

export { DEFAULT_MESSAGE };
