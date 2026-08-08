/**
 * Gallery controllers — upload to /uploads, store path in MongoDB.
 */
import Gallery from '../models/Gallery.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { toPublicPath, deleteUploadedFile } from '../services/uploadService.js';

/** GET /api/gallery — public */
export const getGallery = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;

  const items = await Gallery.find(filter).sort({ createdAt: -1 });

  return sendSuccess(res, {
    message: 'Gallery fetched successfully',
    data: items,
    meta: { count: items.length },
  });
});

/** POST /api/gallery — admin (multipart image preferred) */
export const createGalleryItem = asyncHandler(async (req, res) => {
  const payload = { ...req.body };

  if (req.file) {
    payload.image = toPublicPath(req.file);
  }

  if (!payload.image) {
    throw new AppError('Image is required (upload file or provide image URL)', 400);
  }

  const item = await Gallery.create(payload);

  return sendSuccess(res, {
    statusCode: 201,
    message: 'Gallery item created successfully',
    data: item,
  });
});

/** DELETE /api/gallery/:id — admin (also removes local file when under /uploads) */
export const deleteGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findByIdAndDelete(req.params.id);

  if (!item) {
    throw new AppError('Gallery item not found', 404);
  }

  await deleteUploadedFile(item.image);

  return sendSuccess(res, {
    message: 'Gallery item deleted successfully',
    data: item,
  });
});
