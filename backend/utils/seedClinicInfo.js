/**
 * Upsert singleton clinic settings + doctor profile with real clinic details.
 * Usage: node utils/seedClinicInfo.js
 */
import dotenv from 'dotenv';
dotenv.config();

import connectDB from '../config/db.js';
import ClinicSettings from '../models/ClinicSettings.js';
import DoctorProfile from '../models/DoctorProfile.js';
import logger from './logger.js';

const ADDRESS =
  '3, Ground floor, Aniket Tower, behind Stick Bowl, Uthalsar Naka, Thane West, Thane, India 400601';

const seed = async () => {
  try {
    await connectDB();

    const settingsPayload = {
      clinicName: 'Shree VishwaPrabha Ayurved And Panchakarma Clinic',
      address: ADDRESS,
      phone: '+91 98338 29133',
      whatsappNumber: '919833829133',
      email: 'shreevishwaprabha1@gmail.com',
      googleMapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&z=16&output=embed`,
      googleMapLink: 'https://maps.app.goo.gl/NdB17aKpb6nfRcek7',
      workingHours: {
        weekdays: 'Mon – Sat: 10:00 AM – 8:00 PM',
        sunday: 'Sunday: Closed',
      },
      social: {
        instagram:
          'https://www.instagram.com/shree_vishwaprabha_ayurveda?igsh=MTdwYzJwNmo2NWUydg==',
        facebook: 'https://www.facebook.com/share/19HLxT2jEp/',
        youtube: '',
      },
    };

    const doctorPayload = {
      name: 'Dr. Gauri Patil',
      qualification: 'BAMS, MD(Ayu)',
      experienceYears: 7,
      specialization: 'Ayurveda & Panchakarma',
      about:
        'Dedicated Ayurvedic physician (BAMS, MD Ayu) specializing in classical Ayurveda and Panchakarma with personalized patient care at Shree VishwaPrabha Clinic, Thane.',
      achievements: [
        'BAMS, MD(Ayu)',
        'Chronic disease management',
        'Women’s health & PCOD care',
        'Classical Panchakarma protocols',
      ],
    };

    await ClinicSettings.findOneAndUpdate({}, settingsPayload, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });

    await DoctorProfile.findOneAndUpdate({}, doctorPayload, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });

    logger.info('Clinic settings and doctor profile seeded successfully');
    process.exit(0);
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

seed();
