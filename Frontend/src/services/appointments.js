/**
 * Appointment API service — public create; admin list/update via auth token.
 */
import { get, post, put, del } from './api';

export const createAppointment = (payload) => post('/appointments', payload);

export const getAppointments = (params) => get('/appointments', { params });

export const getAppointmentById = (id) => get(`/appointments/${id}`);

export const updateAppointment = (id, payload) => put(`/appointments/${id}`, payload);

export const deleteAppointment = (id) => del(`/appointments/${id}`);

const appointmentsService = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};

export default appointmentsService;
