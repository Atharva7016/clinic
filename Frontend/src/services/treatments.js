/**
 * Treatments API service.
 */
import { get, post, put, del } from './api';

export const getTreatments = (params) => get('/treatments', { params });

export const getTreatmentById = (id) => get(`/treatments/${id}`);

export const createTreatment = (payload, config) => post('/treatments', payload, config);

export const updateTreatment = (id, payload, config) =>
  put(`/treatments/${id}`, payload, config);

export const deleteTreatment = (id) => del(`/treatments/${id}`);

const treatmentsService = {
  getTreatments,
  getTreatmentById,
  createTreatment,
  updateTreatment,
  deleteTreatment,
};

export default treatmentsService;
