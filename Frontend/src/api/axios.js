/**
 * Legacy Axios entry — re-exports the shared API client from services/api.js.
 * Prefer importing from '../services/api' in new code.
 */
export { default, get, post, put, del, API_URL } from '../services/api';
