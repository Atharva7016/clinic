// Paste this into Extensions → Apps Script on YOUR Google Sheet, then Redeploy.
// Tab name must be "Appointments" (or change SHEET_NAME).

var SHEET_NAME = 'Appointments';

// Leave empty if this script is opened FROM the Google Sheet (Extensions → Apps Script).
// If rows still don't appear, paste your Sheet ID from the browser URL:
// https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
var SPREADSHEET_ID = '';

var HEADERS = [
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

function getSpreadsheet_() {
  if (SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error('No active spreadsheet. Set SPREADSHEET_ID in the script.');
  }
  return ss;
}

function ensureHeader_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('Empty POST body');
    }

    var data = JSON.parse(e.postData.contents);
    var ss = getSpreadsheet_();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    ensureHeader_(sheet);

    sheet.appendRow([
      data.bookedAt || '',
      data.patientName || '',
      data.phone || '',
      data.email || '',
      data.age || '',
      data.gender || '',
      data.disease || '',
      data.preferredDate || '',
      data.preferredTime || '',
      data.status || 'pending',
      data.notes || '',
      data.appointmentId || '',
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, message: 'Clinic appointment webhook is live' })
  ).setMimeType(ContentService.MimeType.JSON);
}
