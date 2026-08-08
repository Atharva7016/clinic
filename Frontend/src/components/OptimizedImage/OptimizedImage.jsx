/**
 * Optimized image with lazy loading, loading placeholder, and error fallback.
 */
import { useState } from 'react';

function OptimizedImage({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  fallbackText = 'Image unavailable',
}) {
  const [status, setStatus] = useState('loading'); // loading | loaded | error

  return (
    <div className={`relative overflow-hidden bg-secondary ${wrapperClassName}`}>
      {status === 'loading' && (
        <div className="absolute inset-0 animate-pulse bg-secondary" aria-hidden="true" />
      )}

      {status === 'error' || !src ? (
        <div className="flex h-full min-h-[120px] w-full items-center justify-center bg-secondary-soft text-center text-xs text-ink-muted">
          {fallbackText}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`${className} ${status === 'loaded' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      )}
    </div>
  );
}

export default OptimizedImage;
