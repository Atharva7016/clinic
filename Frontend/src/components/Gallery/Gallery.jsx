/**
 * Gallery — masonry grid with lightbox; data from GET /api/gallery.
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaTimes, FaExpand } from 'react-icons/fa';
import SectionHeading from '../SectionHeading';
import Skeleton from '../Skeleton';
import EmptyState from '../EmptyState';
import ErrorState from '../ErrorState';
import { useLanguage } from '../../context/LanguageContext';
import { useGallery } from '../../hooks/useGallery';
import { fadeUp, staggerContainer, viewportOnce } from '../../utils/motion';
import '../../styles/components.css';

function Gallery({ limit, showHeading = true }) {
  const { t, content } = useLanguage();
  const { gallery, loading, error, refetch } = useGallery();
  const source = gallery.length > 0 ? gallery : error ? [] : content.gallery;
  const items = limit ? source.slice(0, limit) : source;
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  return (
    <section className="section-padding bg-secondary-soft" id="gallery">
      <div className="container-clinic">
        {showHeading && (
          <SectionHeading
            eyebrow={t('gallery.eyebrow')}
            title={t('gallery.title')}
            subtitle={t('gallery.subtitle')}
          />
        )}

        {loading && <Skeleton count={limit || 6} variant="gallery" />}

        {!loading && error && gallery.length === 0 && (
          <ErrorState title={t('gallery.title')} message={error.message} onRetry={refetch} />
        )}

        {!loading && !error && items.length === 0 && (
          <EmptyState title={t('gallery.title')} message={t('gallery.subtitle')} />
        )}

        {!loading && items.length > 0 && (
          <motion.div
            className="gallery-masonry"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {items.map((item) => (
              <motion.button
                key={item.id}
                type="button"
                variants={fadeUp}
                onClick={() => setActive(item)}
                className="group relative w-full overflow-hidden rounded-2xl text-left shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label={`Open ${item.title} preview`}
              >
                <img
                  src={item.image}
                  alt={`${item.title} — ${item.category}`}
                  className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
                    item.tall ? 'min-h-[220px] sm:min-h-[280px]' : 'min-h-[180px] sm:min-h-[200px]'
                  }`}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src =
                      'data:image/svg+xml,' +
                      encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="#D1FAE5" width="100%" height="100%"/><text x="50%" y="50%" text-anchor="middle" fill="#0F766E" font-family="sans-serif">Image unavailable</text></svg>`
                      );
                  }}
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent p-3 opacity-100 transition sm:p-4 md:opacity-0 md:group-hover:opacity-100">
                  <div className="flex w-full items-center justify-between text-white">
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-secondary">{item.category}</p>
                    </div>
                    <FaExpand className="shrink-0" aria-hidden="true" />
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {limit && !loading && items.length > 0 && (
          <div className="mt-10 text-center">
            <Link to="/gallery" className="btn-ghost">
              {t('gallery.viewAll')}
            </Link>
          </div>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-primary-dark/85 p-3 backdrop-blur-sm sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lift"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={active.image}
                alt={active.title}
                className="max-h-[75vh] w-full object-cover"
              />
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="font-semibold text-ink">{active.title}</p>
                  <p className="text-sm text-ink-muted">{active.category}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary"
                  aria-label={t('common.close')}
                >
                  <FaTimes />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Gallery;
