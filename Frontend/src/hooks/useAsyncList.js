/**
 * Generic data-fetching helper used by list hooks.
 */
import { useCallback, useEffect, useState } from 'react';

export function useAsyncList(fetcher, deps = []) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetcher();
      setItems(Array.isArray(response?.data) ? response.data : []);
    } catch (err) {
      setError(err);
      setItems([]);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { items, loading, error, refetch };
}

export default useAsyncList;
