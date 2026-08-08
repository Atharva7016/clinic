/**
 * Treatment catalogue controllers.
 */
import Treatment from '../models/Treatment.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { toPublicPath, deleteUploadedFile } from '../services/uploadService.js';

/** GET /api/treatments — public list */
export const getTreatments = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.active !== 'false') filter.isActive = true;

  // Admins can request all including inactive via ?active=false with auth route usage
  if (req.query.all === 'true') {
    delete filter.isActive;
  }

  const treatments = await Treatment.find(filter).sort({ createdAt: -1 });

  return sendSuccess(res, {
    message: 'Treatments fetched successfully',
    data: treatments,
    meta: { count: treatments.length },
  });
});

/** GET /api/treatments/:id */
export const getTreatmentById = asyncHandler(async (req, res) => {
  const treatment =
    (await Treatment.findById(req.params.id)) ||
    (await Treatment.findOne({ slug: req.params.id }));

  if (!treatment) {
    throw new AppError('Treatment not found', 404);
  }

  return sendSuccess(res, {
    message: 'Treatment fetched successfully',
    data: treatment,
  });
});

/** POST /api/treatments — admin */
export const createTreatment = asyncHandler(async (req, res) => {
  const payload = { ...req.body };

  if (req.file) {
    payload.image = toPublicPath(req.file);
  }

  const treatment = await Treatment.create(payload);

  return sendSuccess(res, {
    statusCode: 201,
    message: 'Treatment created successfully',
    data: treatment,
  });
});

/** PUT /api/treatments/:id — admin */
export const updateTreatment = asyncHandler(async (req, res) => {
  const payload = { ...req.body };

  if (req.file) {
    payload.image = toPublicPath(req.file);
  }

  const treatment = await Treatment.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });

  if (!treatment) {
    throw new AppError('Treatment not found', 404);
  }

  return sendSuccess(res, {
    message: 'Treatment updated successfully',
    data: treatment,
  });
});

/** DELETE /api/treatments/:id — admin */
export const deleteTreatment = asyncHandler(async (req, res) => {
  const treatment = await Treatment.findByIdAndDelete(req.params.id);

  if (!treatment) {
    throw new AppError('Treatment not found', 404);
  }

  await deleteUploadedFile(treatment.image);

  return sendSuccess(res, {
    message: 'Treatment deleted successfully',
    data: treatment,
  });
});
