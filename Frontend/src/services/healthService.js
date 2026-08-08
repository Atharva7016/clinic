/**
 * API health check helper — verifies backend connectivity.
 */
import { get } from './api';

export const checkApiHealth = async () => {
  const data = await get('/health');
  return data;
};

export default { checkApiHealth };
