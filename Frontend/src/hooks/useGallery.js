/**
 * Hook — fetch gallery from GET /api/gallery
 */
import { useCallback } from 'react';
import { getGallery } from '../services/gallery';
import { resolveMediaUrl } from '../utils/media';
import useAsyncList from './useAsyncList';

const mapGallery = (item) => ({
  id: item._id || item.id,
  title: item.title,
  category: item.category,
  image: resolveMediaUrl(item.image) || item.image,
  tall: false,
});

export function useGallery(params) {
  const fetcher = useCallback(() => getGallery(params), [params]);
  const { items, loading, error, refetch } = useAsyncList(fetcher, [fetcher]);

  return {
    gallery: items.map(mapGallery),
    loading,
    error,
    refetch,
  };
}

export default useGallery;
