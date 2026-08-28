/**
 * Treatments grid — fetches GET /api/treatments (falls back to static data if empty).
 */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import Skeleton from '../Skeleton';
import EmptyState from '../EmptyState';
import ErrorState from '../ErrorState';
import { useLanguage } from '../../context/LanguageContext';
import { useTreatments } from '../../hooks/useTreatments';
import { fadeUp, staggerContainer } from '../../utils/motion';

function Treatments({ limit, showHeading = true }) {
  const { t, content, isMr } = useLanguage();
  const { treatments, loading, error, refetch } = useTreatments();

  const hasStaticFallback = content.treatments.length > 0;
  const source =
    treatments.length > 0 ? treatments : hasStaticFallback ? content.treatments : [];
  const items = limit ? source.slice(0, limit) : source;
  const showSkeleton = loading && items.length === 0;
  const usingFallback = treatments.length === 0;

  const displayTitle = (item) => {
    if (usingFallback) return item.title;
    return isMr ? content.diseaseLabel(item.title) : item.title;
  };

  return (
    <section className="section-padding bg-secondary-soft" id="treatments">
      <div className="container-clinic">
        {showHeading && (
          <SectionHeading
            eyebrow={t('treatments.eyebrow')}
            title={t('treatments.title')}
            subtitle={t('treatments.subtitle')}
          />
        )}

        {showSkeleton && <Skeleton count={limit || 6} />}

        {!showSkeleton && error && treatments.length === 0 && !hasStaticFallback && (
          <ErrorState
            title={t('treatments.loadError')}
            message={error.message}
            onRetry={refetch}
          />
        )}

        {!showSkeleton && !error && items.length === 0 && (
          <EmptyState
            title={t('treatments.emptyTitle')}
            message={t('treatments.emptyMessage')}
          />
        )}

        {!showSkeleton && items.length > 0 && (
          <>
            <motion.div
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {items.map((item) => (
                <motion.article
                  key={item.id}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="group overflow-hidden rounded-2xl border border-secondary bg-white shadow-soft"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={item.image}
                      alt={`${displayTitle(item)} Ayurvedic treatment`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      loading={usingFallback ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 to-transparent opacity-60" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-ink">{displayTitle(item)}</h3>
                    <p className="mt-2 text-sm text-ink-muted">{item.description}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </>
        )}

        {limit && items.length > 0 && (
          <div className="mt-10 text-center">
            <Link to="/treatments" className="btn-ghost">
              {t('treatments.viewAll')}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Treatments;
