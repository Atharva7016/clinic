/**
 * Multer upload middleware for clinic images.
 * Files land in /uploads with unique timestamps.
 */
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import AppError from '../utils/AppError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', 'uploads');

// Ensure uploads directory exists at boot
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, uploadDir);
  },
  filename(_req, file, cb) {
    const safe = file.originalname.replace(/\s+/g, '-').toLowerCase();
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${safe}`;
    cb(null, unique);
  },
});

const fileFilter = (_req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif/;
  const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
  const mimeOk = allowed.test(file.mimetype.split('/')[1] || '');
  const extOk = allowed.test(ext);

  if (mimeOk && extOk) {
    cb(null, true);
  } else {
    cb(new AppError('Only image files are allowed (jpeg, png, webp, gif)', 400));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

/** Single image field named "image" */
export const uploadSingleImage = upload.single('image');

/** Single image field named "photo" (testimonials / doctor) */
export const uploadSinglePhoto = upload.single('photo');

/** Logo upload for clinic settings */
export const uploadLogo = upload.single('logo');

/** Fields for clinic settings (logo + favicon) */
export const uploadClinicAssets = upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'favicon', maxCount: 1 },
]);

export default upload;
