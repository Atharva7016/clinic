/**
 * MongoDB / Mongoose connection with retry on failure.
 */
import mongoose from 'mongoose';
import logger from '../utils/logger.js';

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Connects to MongoDB Atlas (or local) using MONGODB_URI.
 * Retries a few times before throwing — useful during Atlas cold starts.
 */
const connectDB = async (retries = MAX_RETRIES) => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  mongoose.set('strictQuery', true);

  let attempt = 0;

  while (attempt < retries) {
    try {
      attempt += 1;
      const conn = await mongoose.connect(uri);
      logger.info(
        `MongoDB connected: ${conn.connection.host}/${conn.connection.name}`
      );
      return conn;
    } catch (error) {
      logger.error(
        `MongoDB connection attempt ${attempt}/${retries} failed: ${error.message}`
      );

      if (attempt >= retries) {
        throw new Error(
          `Unable to connect to MongoDB after ${retries} attempts: ${error.message}`
        );
      }

      await wait(RETRY_DELAY_MS * attempt);
    }
  }

  return null;
};

export default connectDB;
