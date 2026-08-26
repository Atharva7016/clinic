/**
 * About Doctor — qualifications, mission/vision, professional timeline.
 */
import { motion } from 'framer-motion';
import { FaHeartbeat, FaEye, FaBullseye } from 'react-icons/fa';
import SectionHeading from '../SectionHeading';
import { CLINIC } from '../../data/clinic';
import { useLanguage } from '../../context/LanguageContext';
import { fadeUp, staggerContainer, viewportOnce } from '../../utils/motion';

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

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-3xl space-y-6"
        >
          <motion.p variants={fadeUp} className="text-ink-muted leading-relaxed">
            {t('aboutDoctor.bio', { doctor: CLINIC.doctor.name })}
          </motion.p>

          <motion.ul variants={fadeUp} className="grid gap-3 sm:grid-cols-2">
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

          <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2">
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
