/**
 * Nodemailer email service — reusable templates + safe send.
 * SMTP failures are logged and returned; they do not crash request handlers.
 */
import nodemailer from 'nodemailer';
import env from '../config/env.js';
import clinicInfo from '../config/clinic.js';
import logger from '../utils/logger.js';

const formatDate = (value) => {
  if (!value) return 'N/A';
  try {
    return new Date(value).toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return String(value);
  }
};

/**
 * Creates a Nodemailer transport from env credentials.
 * Returns null when email credentials are incomplete.
 */
export const createTransport = () => {
  if (!env.email.host || !env.email.user || !env.email.pass) {
    logger.warn('Email transport not configured — missing EMAIL_* env vars');
    return null;
  }

  return nodemailer.createTransport({
    host: env.email.host,
    port: env.email.port,
    secure: env.email.port === 465,
    auth: {
      user: env.email.user,
      pass: env.email.pass,
    },
  });
};

export const buildMailOptions = ({ to, subject, text, html }) => ({
  from: `"${clinicInfo.name}" <${env.email.clinic || env.email.user}>`,
  to,
  subject,
  text,
  html,
});

/**
 * Send an email when transport is configured.
 * @returns {Promise<{sent: boolean, info?: object, reason?: string, error?: string}>}
 */
export const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = createTransport();

  if (!transporter) {
    return { sent: false, reason: 'Email not configured' };
  }

  if (!to) {
    return { sent: false, reason: 'Missing recipient' };
  }

  try {
    const info = await transporter.sendMail(
      buildMailOptions({ to, subject, text, html })
    );
    logger.info(`Email sent: ${subject} → ${to} (${info.messageId})`);
    return { sent: true, info };
  } catch (error) {
    logger.error(`SMTP error while sending "${subject}":`, error.message);
    return { sent: false, reason: 'SMTP error', error: error.message };
  }
};

/** Patient-facing appointment confirmation */
export const buildPatientConfirmationEmail = (appointment) => {
  const date = formatDate(appointment.preferredDate);
  const time = appointment.preferredTime || 'To be confirmed';

  const text = [
    `Dear ${appointment.patientName},`,
    '',
    'Your appointment request has been received.',
    '',
    `Clinic: ${clinicInfo.name}`,
    `Doctor: ${clinicInfo.doctorName}`,
    `Date: ${date}`,
    `Time: ${time}`,
    `Address: ${clinicInfo.address}`,
    `Phone: ${clinicInfo.phone}`,
    '',
    'Thank you for choosing Ayurvedic care with us.',
    'We will contact you shortly to confirm your slot.',
  ].join('\n');

  const html = `
    <div style="font-family:Arial,sans-serif;color:#134E4A;line-height:1.6">
      <h2 style="color:#0F766E">Appointment Confirmation</h2>
      <p>Dear <strong>${appointment.patientName}</strong>,</p>
      <p>Your appointment request has been received at <strong>${clinicInfo.name}</strong>.</p>
      <table style="border-collapse:collapse;margin:16px 0">
        <tr><td style="padding:6px 12px 6px 0"><strong>Doctor</strong></td><td>${clinicInfo.doctorName}</td></tr>
        <tr><td style="padding:6px 12px 6px 0"><strong>Date</strong></td><td>${date}</td></tr>
        <tr><td style="padding:6px 12px 6px 0"><strong>Time</strong></td><td>${time}</td></tr>
        <tr><td style="padding:6px 12px 6px 0"><strong>Address</strong></td><td>${clinicInfo.address}</td></tr>
        <tr><td style="padding:6px 12px 6px 0"><strong>Phone</strong></td><td>${clinicInfo.phone}</td></tr>
      </table>
      <p>Thank you for choosing authentic Ayurvedic healing with us. We will contact you shortly to confirm your slot.</p>
      <p style="color:#5B6F6C;font-size:13px">— ${clinicInfo.name}</p>
    </div>
  `;

  return {
    to: appointment.email,
    subject: 'Appointment Confirmation',
    text,
    html,
  };
};

/** Clinic-facing new appointment alert */
export const buildClinicAppointmentEmail = (appointment) => {
  const date = formatDate(appointment.preferredDate);
  const time = appointment.preferredTime || 'N/A';
  const timestamp = formatDate(appointment.createdAt || new Date());

  const text = [
    'New Appointment Booked',
    '',
    `Patient: ${appointment.patientName}`,
    `Phone: ${appointment.phone}`,
    `Email: ${appointment.email || 'N/A'}`,
    `Age: ${appointment.age}`,
    `Gender: ${appointment.gender}`,
    `Problem: ${appointment.disease}`,
    `Preferred Date: ${date}`,
    `Preferred Time: ${time}`,
    `Notes: ${appointment.notes || 'N/A'}`,
    `Timestamp: ${timestamp}`,
  ].join('\n');

  const html = `
    <div style="font-family:Arial,sans-serif;color:#134E4A;line-height:1.6">
      <h2 style="color:#0F766E">New Appointment Booked</h2>
      <table style="border-collapse:collapse">
        <tr><td style="padding:6px 12px 6px 0"><strong>Patient</strong></td><td>${appointment.patientName}</td></tr>
        <tr><td style="padding:6px 12px 6px 0"><strong>Phone</strong></td><td>${appointment.phone}</td></tr>
        <tr><td style="padding:6px 12px 6px 0"><strong>Email</strong></td><td>${appointment.email || 'N/A'}</td></tr>
        <tr><td style="padding:6px 12px 6px 0"><strong>Problem</strong></td><td>${appointment.disease}</td></tr>
        <tr><td style="padding:6px 12px 6px 0"><strong>Preferred Date</strong></td><td>${date}</td></tr>
        <tr><td style="padding:6px 12px 6px 0"><strong>Preferred Time</strong></td><td>${time}</td></tr>
        <tr><td style="padding:6px 12px 6px 0"><strong>Timestamp</strong></td><td>${timestamp}</td></tr>
      </table>
    </div>
  `;

  return {
    to: env.email.clinic || env.email.user,
    subject: 'New Appointment Booked',
    text,
    html,
  };
};

/** Clinic-facing contact inquiry */
export const buildContactInquiryEmail = (contact) => {
  const text = [
    'New Contact Inquiry',
    '',
    `Name: ${contact.name}`,
    `Phone: ${contact.phone}`,
    `Email: ${contact.email}`,
    `Subject: ${contact.subject}`,
    `Message: ${contact.message}`,
  ].join('\n');

  const html = `
    <div style="font-family:Arial,sans-serif;color:#134E4A;line-height:1.6">
      <h2 style="color:#0F766E">New Contact Inquiry</h2>
      <table style="border-collapse:collapse">
        <tr><td style="padding:6px 12px 6px 0"><strong>Name</strong></td><td>${contact.name}</td></tr>
        <tr><td style="padding:6px 12px 6px 0"><strong>Phone</strong></td><td>${contact.phone}</td></tr>
        <tr><td style="padding:6px 12px 6px 0"><strong>Email</strong></td><td>${contact.email}</td></tr>
        <tr><td style="padding:6px 12px 6px 0"><strong>Subject</strong></td><td>${contact.subject}</td></tr>
      </table>
      <p style="margin-top:16px"><strong>Message</strong></p>
      <p>${contact.message}</p>
    </div>
  `;

  return {
    to: env.email.clinic || env.email.user,
    subject: 'New Contact Inquiry',
    text,
    html,
  };
};

/**
 * Send patient + clinic emails for a new appointment.
 * Patient email is skipped when no patient email was provided.
 */
export const notifyAppointmentBooked = async (appointment) => {
  const results = { patient: null, clinic: null };

  results.clinic = await sendEmail(buildClinicAppointmentEmail(appointment));

  if (appointment.email) {
    results.patient = await sendEmail(buildPatientConfirmationEmail(appointment));
  } else {
    results.patient = { sent: false, reason: 'No patient email provided' };
  }

  return results;
};

/** Send clinic notification for a contact form submission */
export const notifyContactInquiry = async (contact) =>
  sendEmail(buildContactInquiryEmail(contact));

/** @deprecated use buildClinicAppointmentEmail */
export const buildAppointmentEmail = buildClinicAppointmentEmail;

const emailService = {
  createTransport,
  buildMailOptions,
  sendEmail,
  buildPatientConfirmationEmail,
  buildClinicAppointmentEmail,
  buildContactInquiryEmail,
  notifyAppointmentBooked,
  notifyContactInquiry,
  buildAppointmentEmail,
};

export default emailService;
