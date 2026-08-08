/**
 * Gallery API service.
 */
import { get, post, del } from './api';

export const getGallery = (params) => get('/gallery', { params });

export const createGalleryItem = (payload, config) => post('/gallery', payload, config);

export const deleteGalleryItem = (id) => del(`/gallery/${id}`);

const galleryService = {
  getGallery,
  createGalleryItem,
  deleteGalleryItem,
};

export default galleryService;
