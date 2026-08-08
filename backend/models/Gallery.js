/**
 * Gallery image model.
 */
import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      enum: {
        values: [
          'Clinic',
          'Doctor',
          'Medicines',
          'Panchakarma',
          'Reception',
          'Treatment',
          'Treatment Rooms',
          'Other',
        ],
        message: 'Invalid gallery category',
      },
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
