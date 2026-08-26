/**
 * Shared Axios client + reusable HTTP helpers for the clinic API.
 * Base URL: VITE_API_URL (preferred) or legacy VITE_API_BASE_URL.
 *
 * Production: set VITE_API_URL to your live API, e.g.
 *   VITE_API_URL=https://api.yourdomain.com/api
 */
import axios from 'axios';

const API_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
  withCredentials: false,
});

api.interceptors.request.use(
  (config) => {
    // Prefer explicit header (set on login); fall back to storage keys
    if (!config.headers.Authorization) {
      const token =
        localStorage.getItem('admin_token') ||
        sessionStorage.getItem('admin_token') ||
        localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    // Let browser set multipart boundary for FormData uploads
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Normalize Axios errors into a friendly Error with optional field errors.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      const timeoutError = new Error('Request timed out. Please try again.');
      timeoutError.status = 408;
      return Promise.reject(timeoutError);
    }

    if (!error.response) {
      const networkError = new Error(
        'Unable to reach the server. Check your connection and try again.'
      );
      networkError.status = 0;
      return Promise.reject(networkError);
    }

    const { status, data } = error.response;
    let message = data?.message || 'Something went wrong. Please try again.';

    if (status === 404) message = data?.message || 'Requested resource was not found.';
    if (status >= 500) message = data?.message || 'Server error. Please try again later.';

    const apiError = new Error(message);
    apiError.status = status;
    apiError.errors = data?.errors || null;
    return Promise.reject(apiError);
  }
);

/** GET helper — returns response.data payload from backend */
export const get = async (url, config = {}) => {
  const { data } = await api.get(url, config);
  return data;
};

/** POST helper */
export const post = async (url, body, config = {}) => {
  const { data } = await api.post(url, body, config);
  return data;
};

/** PUT helper */
export const put = async (url, body, config = {}) => {
  const { data } = await api.put(url, body, config);
  return data;
};

/** DELETE helper */
export const del = async (url, config = {}) => {
  const { data } = await api.delete(url, config);
  return data;
};

export { API_URL };
export default api;
