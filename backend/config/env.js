/**
 * Central environment config accessors.
 * Prefer importing from here instead of scattering process.env reads.
 *
 * Values are read via getters so they work even if dotenv loads after
 * this module is first imported (ESM hoist / import order).
 */
const env = {
  get nodeEnv() {
    return process.env.NODE_ENV || 'development';
  },
  get port() {
    return Number(process.env.PORT) || 5000;
  },
  get mongoUri() {
    return process.env.MONGODB_URI;
  },
  get jwtSecret() {
    return process.env.JWT_SECRET;
  },
  get jwtExpiresIn() {
    return process.env.JWT_EXPIRES_IN || '7d';
  },
  get frontendUrl() {
    return process.env.FRONTEND_URL || 'http://localhost:5173';
  },
  get email() {
    return {
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
      clinic: process.env.CLINIC_EMAIL,
    };
  },
  get whatsappNumber() {
    return process.env.WHATSAPP_NUMBER || '';
  },
  get googleMapEmbedUrl() {
    return process.env.GOOGLE_MAP_EMBED_URL || '';
  },
  get isProd() {
    return (process.env.NODE_ENV || 'development') === 'production';
  },
};

export default env;
