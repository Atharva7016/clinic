/**
 * API route aggregator — mounts all feature routers under /api.
 */
import { Router } from 'express';
import mongoose from 'mongoose';
import appointmentRoutes from './appointmentRoutes.js';
import contactRoutes from './contactRoutes.js';
import treatmentRoutes from './treatmentRoutes.js';
import galleryRoutes from './galleryRoutes.js';
import testimonialRoutes from './testimonialRoutes.js';
import authRoutes from './authRoutes.js';
import clinicRoutes from './clinicRoutes.js';
import adminRoutes from './adminRoutes.js';
import {
  getDoctorProfile,
  getClinicSettings,
} from '../controllers/settingsController.js';

const router = Router();

/** Health check — process + database readiness */
router.get('/health', (_req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbHealthy = dbState === 1;
  const statusCode = dbHealthy ? 200 : 503;

  res.status(statusCode).json({
    success: dbHealthy,
    message: dbHealthy
      ? 'Ayurvedic Clinic API is running'
      : 'API up but database is not connected',
    data: {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        readyState: dbState,
        status: ['disconnected', 'connected', 'connecting', 'disconnecting'][
          dbState
        ],
      },
    },
  });
});

// Public doctor / clinic settings (for website later)
router.get('/doctor', getDoctorProfile);
router.get('/clinic-settings', getClinicSettings);

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/clinic', clinicRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/contact', contactRoutes);
router.use('/treatments', treatmentRoutes);
router.use('/gallery', galleryRoutes);
router.use('/testimonials', testimonialRoutes);

export default router;
