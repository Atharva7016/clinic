/**
 * Testimonial controllers — optional photo upload via Multer.
 */
import Testimonial from '../models/Testimonial.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { toPublicPath, deleteUploadedFile } from '../services/uploadService.js';

/** GET /api/testimonials — public (published only by default) */
export const getTestimonials = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.all !== 'true') {
    filter.isPublished = true;
  }

  const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });

  return sendSuccess(res, {
    message: 'Testimonials fetched successfully',
    data: testimonials,
    meta: { count: testimonials.length },
  });
});

/** POST /api/testimonials — admin */
export const createTestimonial = asyncHandler(async (req, res) => {
  const payload = { ...req.body };

  if (req.file) {
    payload.photo = toPublicPath(req.file);
  }

  const testimonial = await Testimonial.create(payload);

  return sendSuccess(res, {
    statusCode: 201,
    message: 'Testimonial created successfully',
    data: testimonial,
  });
});

/** PUT /api/testimonials/:id — admin */
export const updateTestimonial = asyncHandler(async (req, res) => {
  const payload = { ...req.body };

  if (req.file) {
    payload.photo = toPublicPath(req.file);
  }

  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });

  if (!testimonial) {
    throw new AppError('Testimonial not found', 404);
  }

  return sendSuccess(res, {
    message: 'Testimonial updated successfully',
    data: testimonial,
  });
});

/** DELETE /api/testimonials/:id — admin */
export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

  if (!testimonial) {
    throw new AppError('Testimonial not found', 404);
  }

  await deleteUploadedFile(testimonial.photo);

  return sendSuccess(res, {
    message: 'Testimonial deleted successfully',
    data: testimonial,
  });
});
