/**
 * Hook — fetch testimonials from GET /api/testimonials
 */
import { useCallback } from 'react';
import { getTestimonials } from '../services/testimonials';
import { resolveMediaUrl } from '../utils/media';
import useAsyncList from './useAsyncList';

const mapTestimonial = (item) => ({
  id: item._id || item.id,
  name: item.patientName || item.name,
  photo: resolveMediaUrl(item.photo) || item.photo || '',
  rating: item.rating,
  review: item.review,
});

export function useTestimonials(params) {
  const fetcher = useCallback(() => getTestimonials(params), [params]);
  const { items, loading, error, refetch } = useAsyncList(fetcher, [fetcher]);

  return {
    testimonials: items.map(mapTestimonial),
    loading,
    error,
    refetch,
  };
}

export default useTestimonials;
