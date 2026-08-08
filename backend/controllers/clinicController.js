/**
 * Public clinic info (maps / WhatsApp) for frontend configuration fallbacks.
 */
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { getClinicLocation } from '../utils/maps.js';
import { buildWhatsAppUrl } from '../utils/whatsapp.js';
import clinicInfo from '../config/clinic.js';

/** GET /api/clinic/info */
export const getClinicInfo = asyncHandler(async (_req, res) => {
  const location = getClinicLocation();

  return sendSuccess(res, {
    message: 'Clinic info fetched successfully',
    data: {
      ...clinicInfo,
      ...location,
      whatsappUrl: buildWhatsAppUrl(),
    },
  });
});
