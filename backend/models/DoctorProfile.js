/**
 * Singleton doctor profile for the clinic website + admin panel.
 */
import mongoose from 'mongoose';

const doctorProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, default: 'Dr. Gauri Patil' },
    qualification: {
      type: String,
      trim: true,
      default: 'BAMS, MD(Ayu)',
    },
    experienceYears: { type: Number, default: 13, min: 0 },
    specialization: {
      type: String,
      trim: true,
      default: 'Ayurveda & Panchakarma',
    },
    about: {
      type: String,
      trim: true,
      default:
        'Dedicated Ayurvedic physician (BAMS, MD Ayu) specializing in classical Ayurveda and Panchakarma with personalized patient care.',
    },
    achievements: {
      type: [String],
      default: [
        'BAMS, MD(Ayu)',
        'Chronic disease management',
        'Women’s health & PCOD care',
        'Classical Panchakarma protocols',
      ],
    },
    photo: { type: String, default: '' },
  },
  { timestamps: true }
);

const DoctorProfile = mongoose.model('DoctorProfile', doctorProfileSchema);

export default DoctorProfile;
