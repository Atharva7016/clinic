/**
 * Admin dashboard aggregates for the single-doctor clinic panel.
 */
import Appointment from '../models/Appointment.js';
import Contact from '../models/Contact.js';
import Gallery from '../models/Gallery.js';
import Treatment from '../models/Treatment.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfToday = () => {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
};

/** GET /api/admin/dashboard */
export const getDashboard = asyncHandler(async (_req, res) => {
  const todayStart = startOfToday();
  const todayEnd = endOfToday();

  const [
    todaysAppointments,
    pendingAppointments,
    completedAppointments,
    unreadMessages,
    totalGallery,
    totalTreatments,
    recentAppointments,
    latestMessages,
  ] = await Promise.all([
    Appointment.countDocuments({
      preferredDate: { $gte: todayStart, $lte: todayEnd },
    }),
    Appointment.countDocuments({ status: 'pending' }),
    Appointment.countDocuments({ status: 'completed' }),
    Contact.countDocuments({ isRead: false }),
    Gallery.countDocuments(),
    Treatment.countDocuments(),
    Appointment.find().sort({ createdAt: -1 }).limit(8),
    Contact.find().sort({ createdAt: -1 }).limit(5),
  ]);

  return sendSuccess(res, {
    message: 'Dashboard stats fetched successfully',
    data: {
      cards: {
        todaysAppointments,
        pendingAppointments,
        completedAppointments,
        unreadMessages,
        totalGallery,
        totalTreatments,
      },
      recentAppointments,
      latestMessages,
    },
  });
});
