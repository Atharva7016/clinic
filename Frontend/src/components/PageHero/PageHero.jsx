/**
 * Inner-page hero banner with gradient overlay.
 */
import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/motion';
import { IMAGES } from '../../data/clinic';

function PageHero({ title, subtitle, image = IMAGES.herbs }) {
  return (
    <section className="relative isolate overflow-hidden pt-20 sm:pt-24 md:pt-32">
      <div className="absolute inset-0 -z-10">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover"
          aria-hidden="true"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
      </div>

      <div className="container-clinic py-12 sm:py-16 md:py-24">
        <motion.div
          className="max-w-3xl"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-balance text-2xl font-bold text-white sm:text-3xl md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 max-w-2xl text-sm text-secondary sm:mt-4 sm:text-base md:text-lg">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default PageHero;
