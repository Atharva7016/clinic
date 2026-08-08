/**
 * Admin API aggregator — single-doctor clinic management panel.
 * Reuses existing resource controllers under /api/admin/*
 */
import { Router } from 'express';
import { login, logout, getMe } from '../controllers/authController.js';
import { getDashboard } from '../controllers/dashboardController.js';
import {
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  exportAppointmentsExcel,
} from '../controllers/appointmentController.js';
import { getContacts, deleteContact } from '../controllers/contactController.js';
import { getMessageById, markMessageRead } from '../controllers/messageController.js';
import {
  getGallery,
  createGalleryItem,
  deleteGalleryItem,
} from '../controllers/galleryController.js';
import {
  getTreatments,
  createTreatment,
  updateTreatment,
  deleteTreatment,
} from '../controllers/treatmentController.js';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import {
  getDoctorProfile,
  updateDoctorProfile,
  getClinicSettings,
  updateClinicSettings,
} from '../controllers/settingsController.js';
import { loginRules } from '../validators/commonValidator.js';
import {
  createTreatmentRules,
  updateTreatmentRules,
  treatmentIdParam,
} from '../validators/treatmentValidator.js';
import {
  createGalleryRules,
  galleryIdParam,
  createTestimonialRules,
  testimonialIdParam,
} from '../validators/commonValidator.js';
import { idParamRule, updateAppointmentRules } from '../validators/appointmentValidator.js';
import { contactIdParam } from '../validators/contactValidator.js';
import validate from '../middleware/validate.js';
import protect from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import {
  uploadSingleImage,
  uploadSinglePhoto,
  uploadClinicAssets,
} from '../middleware/upload.js';

const router = Router();

// ----- Auth (also available at /api/auth/login) -----
router.post('/login', authLimiter, loginRules, validate, login);
router.post('/logout', logout);

// Everything below requires the single admin JWT
router.use(protect, authorize('admin'));

router.get('/me', getMe);
router.get('/dashboard', getDashboard);

// Appointments
router.get('/appointments', getAppointments);
router.get('/appointments/export', exportAppointmentsExcel);
router.get('/appointments/:id', idParamRule, validate, getAppointmentById);
router.put('/appointments/:id', updateAppointmentRules, validate, updateAppointment);
router.delete('/appointments/:id', idParamRule, validate, deleteAppointment);

// Contact messages
router.get('/messages', getContacts);
router.get('/messages/:id', contactIdParam, validate, getMessageById);
router.patch('/messages/:id/read', contactIdParam, validate, markMessageRead);
router.delete('/messages/:id', contactIdParam, validate, deleteContact);

// Gallery
router.get('/gallery', getGallery);
router.post(
  '/gallery',
  uploadSingleImage,
  createGalleryRules,
  validate,
  createGalleryItem
);
router.delete('/gallery/:id', galleryIdParam, validate, deleteGalleryItem);

// Treatments (admin sees all including inactive via ?all=true)
router.get('/treatments', (req, _res, next) => {
  req.query.all = 'true';
  next();
}, getTreatments);
router.post(
  '/treatments',
  uploadSingleImage,
  createTreatmentRules,
  validate,
  createTreatment
);
router.put(
  '/treatments/:id',
  uploadSingleImage,
  updateTreatmentRules,
  validate,
  updateTreatment
);
router.delete('/treatments/:id', treatmentIdParam, validate, deleteTreatment);

// Testimonials
router.get('/testimonials', (req, _res, next) => {
  req.query.all = 'true';
  next();
}, getTestimonials);
router.post(
  '/testimonials',
  uploadSinglePhoto,
  createTestimonialRules,
  validate,
  createTestimonial
);
router.put(
  '/testimonials/:id',
  uploadSinglePhoto,
  testimonialIdParam,
  validate,
  updateTestimonial
);
router.delete('/testimonials/:id', testimonialIdParam, validate, deleteTestimonial);

// Doctor profile
router.get('/doctor', getDoctorProfile);
router.put('/doctor', uploadSinglePhoto, updateDoctorProfile);

// Clinic settings
router.get('/clinic-settings', getClinicSettings);
router.put('/clinic-settings', uploadClinicAssets, updateClinicSettings);

export default router;
