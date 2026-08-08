/**
 * Hook — submit appointments to the backend.
 */
import { useCallback, useState } from 'react';
import { createAppointment } from '../services/appointments';

export function useAppointments() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const bookAppointment = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createAppointment(payload);
      setData(response.data);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { bookAppointment, loading, error, data };
}

export default useAppointments;
