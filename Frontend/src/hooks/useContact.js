/**
 * Hook — submit contact messages.
 */
import { useCallback, useState } from 'react';
import { createContact } from '../services/contact';

export function useContact() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const sendMessage = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createContact(payload);
      setData(response.data);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { sendMessage, loading, error, data };
}

export default useContact;
