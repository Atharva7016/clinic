/**
 * Why Choose Us — responsive feature cards.
 */
import { motion } from 'framer-motion';
import {
  FaUserMd,
  FaLeaf,
  FaHandHoldingHeart,
  FaSpa,
  FaRupeeSign,
  FaHospital,
  FaSyncAlt,
  FaHeadset,
} from 'react-icons/fa';
import SectionHeading from '../SectionHeading';
import { useLanguage } from '../../context/LanguageContext';
import { fadeUp, staggerContainer, viewportOnce } from '../../utils/motion';

const ICONS = [
  FaUserMd,
  FaLeaf,
  FaHandHoldingHeart,
  FaSpa,
  FaRupeeSign,
  FaHospital,
  FaSyncAlt,
  FaHeadset,
];

function WhyChooseUs() {
  const { t, content } = useLanguage();

  return (
    <section className="section-padding">
      <div className="container-clinic">
        <SectionHeading
          eyebrow={t('whyChoose.eyebrow')}
          title={t('whyChoose.title')}
          subtitle={t('whyChoose.subtitle')}
        />

        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {content.whyChoose.map((item, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <motion.article
                key={item.id}
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                className="card-surface group p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary transition group-hover:bg-primary group-hover:text-white">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
