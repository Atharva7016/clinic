/**
 * Application entry point.
 * Loads env → connects MongoDB (with retry) → starts HTTP server.
 *
 * `dotenv/config` must be the first import so JWT_SECRET and other vars
 * exist before any config/controller modules read process.env.
 */
import 'dotenv/config';

import mongoose from 'mongoose';
import app from './app.js';
import connectDB from './config/db.js';
import env from './config/env.js';
import validateEnv from './config/validateEnv.js';
import logger from './utils/logger.js';

const startServer = async () => {
  try {
    validateEnv();
    await connectDB();

    // Bind IPv4 explicitly so http://localhost:PORT (127.0.0.1) hits this
    // app — not another process that may already own the IPv4 port.
    const host = process.env.HOST || '0.0.0.0';
    const server = app.listen(env.port, host, () => {
      logger.info(
        `Server running in ${env.nodeEnv} mode on http://${host}:${env.port}`
      );
    });

    const shutdown = async (signal) => {
      logger.info(`${signal} received — shutting down gracefully`);
      server.close(async () => {
        try {
          await mongoose.connection.close();
          logger.info('MongoDB connection closed');
        } catch (err) {
          logger.error('Error closing MongoDB:', err.message);
        }
        logger.info('HTTP server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    process.on('unhandledRejection', (reason) => {
      logger.error('Unhandled Rejection:', reason);
      server.close(() => process.exit(1));
    });

    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception:', error);
      process.exit(1);
    });
  } catch (error) {
    logger.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
