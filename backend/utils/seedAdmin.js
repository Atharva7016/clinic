/**
 * Seed / reset the default admin user from ADMIN_* environment variables.
 * Usage: npm run seed:admin
 *
 * If the admin already exists, password + name are synced from .env so local
 * credentials stay predictable after resets.
 */
import dotenv from 'dotenv';
dotenv.config();

import connectDB from '../config/db.js';
import User from '../models/User.js';
import logger from './logger.js';

const seedAdmin = async () => {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME || 'Clinic Admin';

    if (!email || !password) {
      throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
    }

    const existing = await User.findOne({ email }).select('+password');

    if (existing) {
      existing.name = name;
      existing.password = password;
      existing.role = 'admin';
      existing.isActive = true;
      await existing.save();
      logger.info(`Admin updated: ${email}`);
    } else {
      await User.create({
        name,
        email,
        password,
        role: 'admin',
      });
      logger.info(`Admin created: ${email}`);
    }

    process.exit(0);
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

seedAdmin();
