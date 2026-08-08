/**
 * Patient testimonial model.
 */
import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must be at most 5'],
    },
    review: {
      type: String,
      required: [true, 'Review is required'],
      trim: true,
      maxlength: 1000,
    },
    photo: {
      type: String,
      default: '',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
