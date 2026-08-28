/**
 * Admin API helpers — all calls hit /api/admin/*
 */
import { get, post, put, del } from '../../services/api';
import api from '../../services/api';

const adminGet = (path, config) => get(`/admin${path}`, config);
const adminPost = (path, body, config) => post(`/admin${path}`, body, config);
const adminPut = (path, body, config) => put(`/admin${path}`, body, config);
const adminDel = (path, config) => del(`/admin${path}`, config);

export const adminLogin = (payload) => adminPost('/login', payload);
export const adminLogout = () => adminPost('/logout');
export const adminMe = () => adminGet('/me');
export const getDashboard = () => adminGet('/dashboard');

export const getAdminAppointments = (params) =>
  adminGet('/appointments', { params });
export const updateAdminAppointment = (id, payload) =>
  adminPut(`/appointments/${id}`, payload);
export const deleteAdminAppointment = (id) => adminDel(`/appointments/${id}`);

/** Download appointments.xlsx (auth required). */
export const downloadAppointmentsExcel = async () => {
  const response = await api.get('/admin/appointments/export', {
    responseType: 'blob',
  });
  return response.data;
};

export const getAdminMessages = () => adminGet('/messages');
export const getAdminMessage = (id) => adminGet(`/messages/${id}`);
export const deleteAdminMessage = (id) => adminDel(`/messages/${id}`);

export const getAdminTreatments = () => adminGet('/treatments');
export const createAdminTreatment = (formData) =>
  adminPost('/treatments', formData);
export const updateAdminTreatment = (id, formData) =>
  adminPut(`/treatments/${id}`, formData);
export const deleteAdminTreatment = (id) => adminDel(`/treatments/${id}`);

export const getAdminTestimonials = () => adminGet('/testimonials');
export const createAdminTestimonial = (formData) =>
  adminPost('/testimonials', formData);
export const updateAdminTestimonial = (id, formData) =>
  adminPut(`/testimonials/${id}`, formData);
export const deleteAdminTestimonial = (id) => adminDel(`/testimonials/${id}`);

export const getAdminDoctor = () => adminGet('/doctor');
export const updateAdminDoctor = (formData) => adminPut('/doctor', formData);

export const getAdminClinicSettings = () => adminGet('/clinic-settings');
export const updateAdminClinicSettings = (formData) =>
  adminPut('/clinic-settings', formData);

export { api };
export default {
  adminLogin,
  getDashboard,
};
