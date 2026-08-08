/**
 * Persist booked appointments into a local Excel workbook (.xlsx).
 * Non-fatal — booking must succeed even if Excel write fails.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ExcelJS from 'exceljs';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'data');
const EXCEL_PATH = path.join(DATA_DIR, 'appointments.xlsx');
const SHEET_NAME = 'Appointments';

const HEADERS = [
  'Booked At',
  'Patient Name',
  'Phone',
  'Email',
  'Age',
  'Gender',
  'Problem / Disease',
  'Preferred Date',
  'Preferred Time',
  'Status',
  'Notes',
  'Appointment ID',
];

const ensureDataDir = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
};

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

const styleHeader = (row) => {
  row.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  row.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF0F766E' },
  };
  row.alignment = { vertical: 'middle' };
};

async function loadWorkbook() {
  ensureDataDir();
  const workbook = new ExcelJS.Workbook();

  if (fs.existsSync(EXCEL_PATH)) {
    await workbook.xlsx.readFile(EXCEL_PATH);
    let sheet = workbook.getWorksheet(SHEET_NAME);
    if (!sheet) {
      sheet = workbook.addWorksheet(SHEET_NAME);
      sheet.addRow(HEADERS);
      styleHeader(sheet.getRow(1));
    }
    return { workbook, sheet };
  }

  const sheet = workbook.addWorksheet(SHEET_NAME);
  sheet.columns = HEADERS.map((header) => ({
    header,
    key: header,
    width: Math.max(14, header.length + 2),
  }));
  styleHeader(sheet.getRow(1));
  return { workbook, sheet };
}

/**
 * Append one appointment row to appointments.xlsx
 */
export async function appendAppointmentToExcel(appointment) {
  try {
    const { workbook, sheet } = await loadWorkbook();

    sheet.addRow([
      formatDateTime(appointment.createdAt || new Date()),
      appointment.patientName || '',
      appointment.phone || '',
      appointment.email || '',
      appointment.age ?? '',
      appointment.gender || '',
      appointment.disease || '',
      formatDay(appointment.preferredDate),
      appointment.preferredTime || '',
      appointment.status || 'pending',
      appointment.notes || '',
      String(appointment._id || ''),
    ]);

    await workbook.xlsx.writeFile(EXCEL_PATH);
    return { ok: true, path: EXCEL_PATH };
  } catch (error) {
    logger.error('Excel append failed:', error.message);
    return { ok: false, error: error.message };
  }
}

/** Absolute path of the appointments workbook (for download). */
export function getAppointmentsExcelPath() {
  ensureDataDir();
  return EXCEL_PATH;
}

export function appointmentsExcelExists() {
  return fs.existsSync(EXCEL_PATH);
}

/**
 * Rebuild the full workbook from a list of appointments (optional sync).
 */
export async function rebuildAppointmentsExcel(appointments = []) {
  ensureDataDir();
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(SHEET_NAME);
  sheet.columns = HEADERS.map((header) => ({
    header,
    key: header,
    width: Math.max(14, header.length + 2),
  }));
  styleHeader(sheet.getRow(1));

  for (const appointment of appointments) {
    sheet.addRow([
      formatDateTime(appointment.createdAt),
      appointment.patientName || '',
      appointment.phone || '',
      appointment.email || '',
      appointment.age ?? '',
      appointment.gender || '',
      appointment.disease || '',
      formatDay(appointment.preferredDate),
      appointment.preferredTime || '',
      appointment.status || 'pending',
      appointment.notes || '',
      String(appointment._id || ''),
    ]);
  }

  await workbook.xlsx.writeFile(EXCEL_PATH);
  return EXCEL_PATH;
}

export default {
  appendAppointmentToExcel,
  getAppointmentsExcelPath,
  appointmentsExcelExists,
  rebuildAppointmentsExcel,
};
