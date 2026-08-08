/**
 * Doctor profile + clinic settings controllers (singleton documents).
 */
import DoctorProfile from '../models/DoctorProfile.js';
import ClinicSettings from '../models/ClinicSettings.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { toPublicPath } from '../services/uploadService.js';

const getOrCreateDoctor = async () => {
  let doc = await DoctorProfile.findOne();
  if (!doc) doc = await DoctorProfile.create({});
  return doc;
};

const getOrCreateSettings = async () => {
  let doc = await ClinicSettings.findOne();
  if (!doc) doc = await ClinicSettings.create({});
  return doc;
};

/** GET /api/admin/doctor  (also public via /api/doctor) */
export const getDoctorProfile = asyncHandler(async (_req, res) => {
  const doctor = await getOrCreateDoctor();
  return sendSuccess(res, {
    message: 'Doctor profile fetched successfully',
    data: doctor,
  });
});

/** PUT /api/admin/doctor */
export const updateDoctorProfile = asyncHandler(async (req, res) => {
  const doctor = await getOrCreateDoctor();
  const payload = { ...req.body };

  if (typeof payload.achievements === 'string') {
    payload.achievements = payload.achievements
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  if (req.file) {
    payload.photo = toPublicPath(req.file);
  }

  Object.assign(doctor, payload);
  await doctor.save();

  return sendSuccess(res, {
    message: 'Doctor profile updated successfully',
    data: doctor,
  });
});

/** GET /api/admin/clinic-settings */
export const getClinicSettings = asyncHandler(async (_req, res) => {
  const settings = await getOrCreateSettings();
  return sendSuccess(res, {
    message: 'Clinic settings fetched successfully',
    data: settings,
  });
});

/** PUT /api/admin/clinic-settings */
export const updateClinicSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();
  const payload = { ...req.body };

  // Nested objects may arrive as JSON strings from multipart forms
  if (typeof payload.workingHours === 'string') {
    try {
      payload.workingHours = JSON.parse(payload.workingHours);
    } catch {
      /* keep as-is */
    }
  }
  if (typeof payload.social === 'string') {
    try {
      payload.social = JSON.parse(payload.social);
    } catch {
      /* keep as-is */
    }
  }

  if (req.files?.logo?.[0]) {
    payload.logo = toPublicPath(req.files.logo[0]);
  }
  if (req.files?.favicon?.[0]) {
    payload.favicon = toPublicPath(req.files.favicon[0]);
  }
  if (req.file && req.file.fieldname === 'logo') {
    payload.logo = toPublicPath(req.file);
  }

  if (payload.workingHours) {
    settings.workingHours = {
      ...settings.workingHours.toObject?.() || settings.workingHours,
      ...payload.workingHours,
    };
    delete payload.workingHours;
  }
  if (payload.social) {
    settings.social = {
      ...settings.social.toObject?.() || settings.social,
      ...payload.social,
    };
    delete payload.social;
  }

  Object.assign(settings, payload);
  await settings.save();

  return sendSuccess(res, {
    message: 'Clinic settings updated successfully',
    data: settings,
  });
});
