/**
 * Full-bleed hero — mobile-first stack, desktop split layout.
 */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhoneAlt, FaLeaf, FaUserMd, FaSpa } from 'react-icons/fa';
import { CLINIC, IMAGES } from '../../data/clinic';
import { useLanguage } from '../../context/LanguageContext';
import { fadeUp, fadeRight, staggerContainer } from '../../utils/motion';

function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={IMAGES.hero}
          alt={t('hero.imageAlt')}
          className="h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-transparent to-primary-dark/20" />
      </div>

      <div className="container-clinic grid min-h-[100svh] items-center gap-8 pb-12 pt-24 text-center sm:gap-10 sm:pb-16 sm:pt-28 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-32 lg:text-left">
        <motion.div
          className="order-1 lg:col-span-7"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary backdrop-blur sm:mb-4 sm:px-4 sm:text-xs sm:tracking-[0.18em]"
          >
            <FaLeaf className="text-accent" aria-hidden="true" />
            {CLINIC.shortName}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mx-auto max-w-3xl text-balance text-3xl font-bold leading-tight text-white xs:text-4xl sm:text-5xl lg:mx-0 lg:text-6xl"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-xl text-sm text-secondary sm:mt-5 sm:text-base lg:mx-0 lg:text-lg"
          >
            {t('hero.subtitle', { doctor: CLINIC.doctor.name })}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mx-auto mt-6 flex w-full max-w-md flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center lg:mx-0 lg:justify-start"
          >
            <Link to="/appointment" className="btn-accent w-full sm:w-auto">
              {t('hero.book')}
            </Link>
            <a
              href={CLINIC.contact.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="btn-outline w-full sm:w-auto"
            >
              <FaWhatsapp aria-hidden="true" />
              {t('hero.whatsapp')}
            </a>
            <a href={CLINIC.contact.phoneHref} className="btn-outline w-full sm:w-auto">
              <FaPhoneAlt aria-hidden="true" />
              {t('hero.call')}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative order-2 mx-auto w-full max-w-sm sm:max-w-md lg:col-span-5 lg:mx-0 lg:max-w-none"
          variants={fadeRight}
          initial="hidden"
          animate="visible"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/25 shadow-lift sm:rounded-[2rem]">
            <img
              src={IMAGES.doctor}
              alt={`${CLINIC.doctor.name}, ${CLINIC.doctor.qualification}`}
              className="aspect-[4/5] w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-left text-white sm:p-6">
              <p className="text-base font-semibold sm:text-lg">{CLINIC.doctor.name}</p>
              <p className="text-xs text-secondary sm:text-sm">
                {CLINIC.doctor.qualification}
              </p>
            </div>
          </div>

          <motion.div
            className="glass-card absolute -left-2 top-8 hidden max-w-[160px] p-3 text-left text-white sm:-left-3 sm:top-10 sm:block sm:max-w-[180px] sm:p-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FaUserMd className="mb-2 text-accent" aria-hidden="true" />
            <p className="text-xs font-semibold">{t('hero.years')}</p>
            <p className="text-[11px] text-secondary">{t('hero.clinical')}</p>
          </motion.div>

          <motion.div
            className="glass-card absolute -right-1 bottom-20 hidden max-w-[170px] p-3 text-left text-white sm:-right-2 sm:bottom-24 sm:block sm:max-w-[190px] sm:p-4"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          >
            <FaSpa className="mb-2 text-accent" aria-hidden="true" />
            <p className="text-xs font-semibold">{t('nav.panchakarma')}</p>
            <p className="text-[11px] text-secondary">{t('hero.detox')}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
