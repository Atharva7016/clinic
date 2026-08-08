/**
 * Panchakarma therapies showcase cards.
 */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import { useLanguage } from '../../context/LanguageContext';
import { fadeUp, staggerContainer, viewportOnce } from '../../utils/motion';

function Panchakarma({ limit, showHeading = true, showCta = true }) {
  const { t, content } = useLanguage();
  const items = limit ? content.panchakarma.slice(0, limit) : content.panchakarma;

  return (
    <section className="section-padding" id="panchakarma">
      <div className="container-clinic">
        {showHeading && (
          <SectionHeading
            eyebrow={t('panchakarma.eyebrow')}
            title={t('panchakarma.title')}
            subtitle={t('panchakarma.subtitle')}
          />
        )}

        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 sm:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {items.map((item) => (
            <motion.article
              key={item.id}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              className="overflow-hidden rounded-2xl bg-primary text-white shadow-soft"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover opacity-90 transition duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/35" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-accent-light">{item.title}</h3>
                <p className="mt-2 text-sm text-secondary/95">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {showCta && limit && (
          <div className="mt-10 text-center">
            <Link to="/panchakarma" className="btn-primary">
              {t('panchakarma.viewAll')}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Panchakarma;
