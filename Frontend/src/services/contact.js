/**
 * Contact form API service.
 */
import { get, post, del } from './api';

export const createContact = (payload) => post('/contact', payload);

export const getContacts = () => get('/contact');

export const deleteContact = (id) => del(`/contact/${id}`);

const contactService = {
  createContact,
  getContacts,
  deleteContact,
};

export default contactService;
