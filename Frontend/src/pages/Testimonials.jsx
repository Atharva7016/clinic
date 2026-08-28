/**
 * Testimonials page — slider + grid fed by API (with static fallback).
 */
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import Testimonials from '../components/Testimonials';
import AppointmentCTA from '../components/AppointmentCTA';
import Skeleton from '../components/Skeleton';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { IMAGES } from '../data/clinic';
import { useLanguage } from '../context/LanguageContext';
import { useTestimonials } from '../hooks/useTestimonials';
import { fadeUp, staggerContainer } from '../utils/motion';

function TestimonialsPage() {
  const { t, content } = useLanguage();
  const { testimonials, loading, error, refetch } = useTestimonials();
  const hasStaticFallback = content.testimonials.length > 0;
  const raw =
    testimonials.length > 0 ? testimonials : hasStaticFallback ? content.testimonials : [];
  const list = content.localizeTestimonials(raw);
  const showSkeleton = loading && list.length === 0;

  return (
    <>
      <SEO
        title={t('pages.testimonials.title')}
        description={t('pages.testimonials.description')}
        path="/testimonials"
      />
      <PageHero
        title={t('pages.testimonials.heroTitle')}
        subtitle={t('pages.testimonials.heroSubtitle')}
        image={IMAGES.yoga}
      />
      <Testimonials showHeading={false} showCta={false} />

      <section className="section-padding bg-secondary-soft">
        <div className="container-clinic">
          {showSkeleton && <Skeleton count={3} />}

          {!showSkeleton && error && testimonials.length === 0 && !hasStaticFallback && (
            <ErrorState
              title={t('testimonials.eyebrow')}
              message={error.message}
              onRetry={refetch}
            />
          )}

          {!showSkeleton && !error && list.length === 0 && (
            <EmptyState title={t('testimonials.title')} message={t('testimonials.subtitle')} />
          )}

          {!showSkeleton && list.length > 0 && (
            <motion.div
              className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {list.map((item) => (
                <motion.article
                  key={item.id}
                  variants={fadeUp}
                  className="rounded-2xl border border-secondary bg-white p-6 shadow-soft"
                >
                  <div className="mb-3 flex gap-1 text-accent" aria-hidden="true">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    &ldquo;{item.review}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    {item.photo ? (
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="h-11 w-11 rounded-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary">
                        {item.name?.charAt(0) || 'P'}
                      </div>
                    )}
                    <p className="font-semibold text-ink">{item.name}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <AppointmentCTA />
    </>
  );
}

export default TestimonialsPage;
