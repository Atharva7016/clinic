/**
 * Reusable section eyebrow + title + subtitle block.
 */
import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../../utils/motion';

function SectionHeading({ eyebrow, title, subtitle, align = 'center', light = false }) {
  const alignClass = align === 'left' ? 'text-left items-start' : 'text-center items-center';

  return (
    <motion.div
      className={`mb-8 flex flex-col gap-2 sm:mb-12 sm:gap-3 md:mb-16 ${alignClass}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {eyebrow && (
        <span
          className={`text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.2em] ${
            light ? 'text-accent-light' : 'text-accent-dark'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`max-w-3xl text-balance text-2xl font-bold sm:text-3xl md:text-4xl lg:text-[2.75rem] ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`max-w-2xl text-sm sm:text-base md:text-lg ${
            light ? 'text-secondary' : 'text-ink-muted'
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-2 h-1 w-16 rounded-full ${light ? 'bg-accent' : 'bg-primary'}`}
        aria-hidden="true"
      />
    </motion.div>
  );
}

export default SectionHeading;
