/**
 * Resolve uploaded media paths from the API to absolute URLs.
 * Backend returns paths like "/uploads/photo.jpg".
 */
import { API_URL } from '../services/api';

const API_ORIGIN = API_URL.replace(/\/api\/?$/, '');

export const resolveMediaUrl = (path) => {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
};

export default resolveMediaUrl;
