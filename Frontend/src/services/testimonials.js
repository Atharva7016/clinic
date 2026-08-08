/**
 * Testimonials API service.
 */
import { get, post, del } from './api';

export const getTestimonials = (params) => get('/testimonials', { params });

export const createTestimonial = (payload, config) =>
  post('/testimonials', payload, config);

export const deleteTestimonial = (id) => del(`/testimonials/${id}`);

const testimonialsService = {
  getTestimonials,
  createTestimonial,
  deleteTestimonial,
};

export default testimonialsService;
