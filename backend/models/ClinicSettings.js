/**
 * Singleton clinic settings used by public site + admin panel.
 */
import mongoose from 'mongoose';

const DEFAULT_ADDRESS =
  '3, Ground floor, Aniket Tower, behind Stick Bowl, Uthalsar Naka, Thane West, Thane, India 400601';

const clinicSettingsSchema = new mongoose.Schema(
  {
    clinicName: {
      type: String,
      trim: true,
      default: 'Shree VishwaPrabha Ayurved And Panchakarma Clinic',
    },
    address: {
      type: String,
      trim: true,
      default: DEFAULT_ADDRESS,
    },
    phone: { type: String, trim: true, default: '+91 98338 29133' },
    whatsappNumber: { type: String, trim: true, default: '919833829133' },
    email: { type: String, trim: true, default: 'shreevishwaprabha1@gmail.com' },
    googleMapEmbedUrl: {
      type: String,
      trim: true,
      default: `https://maps.google.com/maps?q=${encodeURIComponent(DEFAULT_ADDRESS)}&z=16&output=embed`,
    },
    googleMapLink: {
      type: String,
      trim: true,
      default: 'https://maps.app.goo.gl/RqoPqLBX5ecn5dQ47?g_st=ac',
    },
    workingHours: {
      weekdays: { type: String, default: 'Mon – Sat: 10:00 AM – 8:00 PM' },
      sunday: { type: String, default: 'Sunday: Closed' },
    },
    social: {
      instagram: {
        type: String,
        default:
          'https://www.instagram.com/shree_vishwaprabha_ayurveda?igsh=MTdwYzJwNmo2NWUydg==',
      },
      facebook: {
        type: String,
        default: 'https://www.facebook.com/share/19HLxT2jEp/',
      },
      youtube: { type: String, default: '' },
    },
    logo: { type: String, default: '' },
    favicon: { type: String, default: '' },
  },
  { timestamps: true }
);

const ClinicSettings = mongoose.model('ClinicSettings', clinicSettingsSchema);

export default ClinicSettings;
