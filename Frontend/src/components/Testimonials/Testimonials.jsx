/**
 * Testimonials slider — single card, autoplay, swipe on touch devices.
 */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import SectionHeading from '../SectionHeading';
import Skeleton from '../Skeleton';
import EmptyState from '../EmptyState';
import ErrorState from '../ErrorState';
import { useLanguage } from '../../context/LanguageContext';
import { useTestimonials } from '../../hooks/useTestimonials';
import { zoomIn } from '../../utils/motion';
import '../../styles/components.css';

function Testimonials({ showHeading = true, showCta = true }) {
  const { t, content } = useLanguage();
  const { testimonials, loading, error, refetch } = useTestimonials();
  const hasStaticFallback = content.testimonials.length > 0;
  const raw =
    testimonials.length > 0 ? testimonials : hasStaticFallback ? content.testimonials : [];
  const list = content.localizeTestimonials(raw);
  const showSkeleton = loading && list.length === 0;
  const [index, setIndex] = useState(0);
  const total = list.length;
  const current = list[index] || null;
  const touchStartX = useRef(null);

  useEffect(() => {
    setIndex(0);
  }, [list.length]);

  useEffect(() => {
    if (total < 2) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 5500);
    return () => clearInterval(id);
  }, [total, index]);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current == null || total < 2) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 48) return;
    if (delta < 0) next();
    else prev();
  };

  return (
    <section className="section-padding" id="testimonials">
      <div className="container-clinic">
        {showHeading && (
          <SectionHeading
            eyebrow={t('testimonials.eyebrow')}
            title={t('testimonials.title')}
            subtitle={t('testimonials.subtitle')}
          />
        )}

        {showSkeleton && <Skeleton variant="testimonial" />}

        {!showSkeleton && error && testimonials.length === 0 && !hasStaticFallback && (
          <ErrorState
            title={t('testimonials.eyebrow')}
            message={error.message}
            onRetry={refetch}
          />
        )}

        {!showSkeleton && !error && list.length === 0 && (
          <EmptyState
            title={t('testimonials.title')}
            message={t('testimonials.subtitle')}
          />
        )}

        {!showSkeleton && current && (
          <motion.div
            className="relative mx-auto max-w-3xl"
            variants={zoomIn}
            initial="hidden"
            animate="visible"
          >
            <div
              className="overflow-hidden rounded-2xl border border-secondary bg-white p-5 shadow-soft touch-pan-y sm:rounded-[2rem] sm:p-8 md:p-12"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <FaQuoteLeft className="mb-4 text-2xl text-accent sm:mb-6 sm:text-3xl" aria-hidden="true" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35 }}
                >
                  <div
                    className="mb-4 flex gap-1 text-accent"
                    aria-label={`${current.rating} star rating`}
                  >
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className="text-base leading-relaxed text-ink sm:text-lg md:text-xl">
                    &ldquo;{current.review}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3 sm:mt-8 sm:gap-4">
                    {current.photo ? (
                      <img
                        src={current.photo}
                        alt={current.name}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-secondary sm:h-14 sm:w-14"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary ring-2 ring-secondary sm:h-14 sm:w-14">
                        {current.name?.charAt(0) || 'P'}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-ink">{current.name}</p>
                      <p className="text-sm text-ink-muted">{t('testimonials.verified')}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {total > 1 && (
              <div className="mt-5 flex items-center justify-center gap-3 sm:mt-6 sm:gap-4">
                <button
                  type="button"
                  onClick={prev}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary bg-white text-primary transition hover:bg-primary hover:text-white"
                  aria-label="Previous testimonial"
                >
                  <FaChevronLeft />
                </button>
                <div className="flex gap-2" role="tablist" aria-label="Testimonial slides">
                  {list.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      onClick={() => setIndex(i)}
                      className={`h-2.5 min-h-[10px] rounded-full transition-all ${
                        i === index ? 'w-8 bg-primary' : 'w-2.5 bg-secondary'
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={next}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary bg-white text-primary transition hover:bg-primary hover:text-white"
                  aria-label="Next testimonial"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </motion.div>
        )}

        {showCta && list.length > 0 && (
          <div className="mt-8 text-center sm:mt-10">
            <Link to="/testimonials" className="btn-ghost">
              {t('testimonials.viewAll')}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Testimonials;
