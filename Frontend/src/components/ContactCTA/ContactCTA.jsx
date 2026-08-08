/**
 * Compact contact CTA strip used on multiple pages.
 */
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { CLINIC } from '../../data/clinic';
import { useLanguage } from '../../context/LanguageContext';
import { fadeUp, viewportOnce } from '../../utils/motion';

function ContactCTA() {
  const { t } = useLanguage();

  return (
    <section className="py-12">
      <div className="container-clinic">
        <motion.div
          className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-secondary bg-secondary-soft p-8 md:flex-row md:items-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="flex gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
              <FaMapMarkerAlt aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-ink">{t('contactCta.title')}</h2>
              <p className="mt-1 max-w-xl text-sm text-ink-muted">{CLINIC.contact.address}</p>
            </div>
          </div>
          <a
            href={CLINIC.contact.mapLink}
            target="_blank"
            rel="noreferrer"
            className="btn-primary shrink-0"
          >
            {t('contactCta.directions')} <FaArrowRight aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactCTA;
