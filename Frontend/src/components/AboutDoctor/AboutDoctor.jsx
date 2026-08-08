/**
 * About Doctor — photo, qualifications, mission/vision, professional timeline.
 */
import { motion } from 'framer-motion';
import { FaAward, FaHeartbeat, FaEye, FaBullseye } from 'react-icons/fa';
import SectionHeading from '../SectionHeading';
import { CLINIC, IMAGES } from '../../data/clinic';
import { useLanguage } from '../../context/LanguageContext';
import { fadeLeft, fadeRight, fadeUp, staggerContainer, viewportOnce } from '../../utils/motion';

function AboutDoctor({ compact = false }) {
  const { t, content } = useLanguage();
  const skills = t('aboutDoctor.skills');
  const skillList = Array.isArray(skills) ? skills : [];

  return (
    <section className="section-padding bg-section-fade" id="about-doctor">
      <div className="container-clinic">
        <SectionHeading
          eyebrow={t('aboutDoctor.eyebrow')}
          title={`${CLINIC.doctor.name}`}
          subtitle={`${CLINIC.doctor.qualification} · ${CLINIC.doctor.specialty}`}
        />

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            className="relative"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-secondary to-accent/30 blur-sm" />
            <img
              src={IMAGES.doctor}
              alt={`${CLINIC.doctor.name} portrait`}
              className="relative aspect-[4/5] w-full rounded-[1.75rem] object-cover shadow-lift"
            />
            <div className="absolute -bottom-5 left-6 right-6 rounded-2xl bg-primary p-4 text-white shadow-soft sm:left-10 sm:right-auto sm:max-w-xs">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <FaAward className="text-accent" aria-hidden="true" />
                {t('aboutDoctor.yearsExp', { years: CLINIC.doctor.experienceYears })}
              </p>
              <p className="mt-1 text-xs text-secondary">{t('aboutDoctor.trusted')}</p>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-6"
          >
            <motion.p variants={fadeRight} className="text-ink-muted leading-relaxed">
              {t('aboutDoctor.bio', { doctor: CLINIC.doctor.name })}
            </motion.p>

            <motion.ul variants={fadeRight} className="grid gap-3 sm:grid-cols-2">
              {skillList.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 rounded-xl bg-white p-3 text-sm font-medium text-ink shadow-soft"
                >
                  <FaHeartbeat className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeRight} className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-secondary bg-white p-5">
                <FaBullseye className="mb-2 text-accent" aria-hidden="true" />
                <h3 className="font-semibold text-ink">{t('aboutDoctor.mission')}</h3>
                <p className="mt-2 text-sm text-ink-muted">{t('aboutDoctor.missionBody')}</p>
              </div>
              <div className="rounded-2xl border border-secondary bg-white p-5">
                <FaEye className="mb-2 text-accent" aria-hidden="true" />
                <h3 className="font-semibold text-ink">{t('aboutDoctor.vision')}</h3>
                <p className="mt-2 text-sm text-ink-muted">{t('aboutDoctor.visionBody')}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {!compact && (
          <motion.div
            className="mt-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h3 className="mb-8 text-center text-2xl font-bold text-ink">
              {t('aboutDoctor.timeline')}
            </h3>
            <ol className="relative mx-auto max-w-3xl space-y-6 border-l-2 border-secondary pl-8">
              {content.timeline.map((item) => (
                <li key={item.year} className="relative">
                  <span className="absolute -left-[2.4rem] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-white">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent-dark">
                    {item.year}
                  </p>
                  <h4 className="mt-1 font-semibold text-ink">{item.title}</h4>
                  <p className="mt-1 text-sm text-ink-muted">{item.description}</p>
                </li>
              ))}
            </ol>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default AboutDoctor;
