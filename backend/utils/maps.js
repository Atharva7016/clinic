/**
 * Google Maps helpers — embed URL + directions link from env / coordinates.
 */
import clinicInfo from '../config/clinic.js';

/**
 * Resolve the Maps embed URL from env or lat/lng fallback.
 */
export const getMapEmbedUrl = ({
  embedUrl = process.env.GOOGLE_MAP_EMBED_URL,
  lat,
  lng,
  address = clinicInfo.address,
} = {}) => {
  if (embedUrl) return embedUrl;

  if (lat != null && lng != null) {
    return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  }

  if (address) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`;
  }

  return null;
};

/**
 * Google Maps directions deep link.
 */
export const getDirectionsUrl = (address = clinicInfo.address) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

/**
 * Public clinic location payload for API consumers.
 */
export const getClinicLocation = () => ({
  address: clinicInfo.address,
  phone: clinicInfo.phone,
  email: clinicInfo.email,
  embedUrl: getMapEmbedUrl(),
  directionsUrl: getDirectionsUrl(),
  whatsappNumber: process.env.WHATSAPP_NUMBER || '',
});

const mapsUtil = {
  getMapEmbedUrl,
  getDirectionsUrl,
  getClinicLocation,
};

export default mapsUtil;
