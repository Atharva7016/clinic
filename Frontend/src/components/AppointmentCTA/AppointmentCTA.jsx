/**
 * Appointment call-to-action band — Book / Call / WhatsApp.
 */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhoneAlt, FaCalendarCheck } from 'react-icons/fa';
import { CLINIC, IMAGES } from '../../data/clinic';
import { useLanguage } from '../../context/LanguageContext';
import { fadeUp, viewportOnce } from '../../utils/motion';

function AppointmentCTA() {
  const { t } = useLanguage();

  return (
    <section className="relative isolate overflow-hidden py-20" aria-labelledby="appointment-cta-heading">
      <div className="absolute inset-0 -z-10">
        <img src={IMAGES.yoga} alt="" className="h-full w-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-hero-gradient" />
      </div>

      <div className="container-clinic">
        <motion.div
          className="mx-auto max-w-3xl text-center text-white"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
            {t('appointmentCta.eyebrow')}
          </p>
          <h2 id="appointment-cta-heading" className="mt-3 text-3xl font-bold md:text-4xl">
            {t('appointmentCta.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-secondary">
            {t('appointmentCta.subtitle', { doctor: CLINIC.doctor.name })}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/appointment" className="btn-accent">
              <FaCalendarCheck aria-hidden="true" />
              {t('appointmentCta.book')}
            </Link>
            <a href={CLINIC.contact.phoneHref} className="btn-outline">
              <FaPhoneAlt aria-hidden="true" />
              {t('appointmentCta.call')}
            </a>
            <a
              href={CLINIC.contact.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              <FaWhatsapp aria-hidden="true" />
              {t('appointmentCta.whatsapp')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AppointmentCTA;
