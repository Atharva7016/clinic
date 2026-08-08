/**
 * Animated statistics counters — triggers when scrolled into view.
 */
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { formatNumber } from '../../utils/helpers';
import { fadeUp, staggerContainer, viewportOnce } from '../../utils/motion';

function useCountUp(target, active, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    let frame;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

function StatItem({ value, suffix, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const count = useCountUp(value, inView);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="rounded-2xl border border-secondary bg-white p-5 text-center shadow-soft sm:p-6"
    >
      <p className="text-3xl font-bold text-primary md:text-4xl">
        {formatNumber(count)}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-ink-muted">{label}</p>
    </motion.div>
  );
}

function Statistics() {
  const { content } = useLanguage();

  return (
    <section className="relative -mt-10 pb-4 md:-mt-14" aria-label="Clinic statistics">
      <div className="container-clinic">
        <motion.div
          className="grid grid-cols-1 gap-3 xs:grid-cols-2 xs:gap-4 md:grid-cols-4 md:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {content.statistics.map((stat) => (
            <StatItem key={stat.id} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Statistics;
