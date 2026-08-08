/**
 * Upload service — helpers around Multer-saved files.
 * Paths stored in MongoDB are relative (e.g. /uploads/filename.jpg).
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import AppError from '../utils/AppError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsRoot = path.join(__dirname, '..', 'uploads');

const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
]);

const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

/**
 * Validate an uploaded Multer file (MIME + extension).
 * @param {Express.Multer.File} file
 */
export const validateImageFile = (file) => {
  if (!file) {
    throw new AppError('Image file is required', 400);
  }

  const ext = path.extname(file.originalname).toLowerCase();
  if (!ALLOWED_MIME.has(file.mimetype) || !ALLOWED_EXT.has(ext)) {
    throw new AppError('Only PNG, JPG, JPEG, WEBP, or GIF images are allowed', 400);
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new AppError('Image must be 5MB or smaller', 400);
  }

  return true;
};

/**
 * Convert Multer file to a public path stored in MongoDB.
 * @param {Express.Multer.File} file
 * @returns {string}
 */
export const toPublicPath = (file) => {
  validateImageFile(file);
  return `/uploads/${file.filename}`;
};

/**
 * Best-effort delete of a previously uploaded file from disk.
 * @param {string} publicPath - e.g. /uploads/abc.jpg
 */
export const deleteUploadedFile = async (publicPath) => {
  if (!publicPath || !publicPath.startsWith('/uploads/')) return;

  const filename = path.basename(publicPath);
  const absolute = path.join(uploadsRoot, filename);

  try {
    await fs.unlink(absolute);
  } catch {
    // File may already be missing — ignore
  }
};

const uploadService = {
  validateImageFile,
  toPublicPath,
  deleteUploadedFile,
  ALLOWED_MIME,
  ALLOWED_EXT,
};

export default uploadService;
