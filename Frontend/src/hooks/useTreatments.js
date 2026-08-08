/**
 * Hook — fetch treatments from GET /api/treatments
 */
import { useCallback } from 'react';
import { getTreatments } from '../services/treatments';
import { resolveMediaUrl } from '../utils/media';
import useAsyncList from './useAsyncList';

const mapTreatment = (item) => ({
  id: item._id || item.id || item.slug,
  title: item.title,
  description: item.description,
  image: resolveMediaUrl(item.image) || item.image,
  slug: item.slug,
  category: item.category,
});

export function useTreatments(params) {
  const fetcher = useCallback(() => getTreatments(params), [params]);
  const { items, loading, error, refetch } = useAsyncList(fetcher, [fetcher]);

  return {
    treatments: items.map(mapTreatment),
    loading,
    error,
    refetch,
  };
}

export default useTreatments;
