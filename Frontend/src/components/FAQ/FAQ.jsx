/**
 * FAQ accordion with smooth Framer Motion expand/collapse.
 */
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';
import SectionHeading from '../SectionHeading';
import { useLanguage } from '../../context/LanguageContext';
import { fadeUp, viewportOnce } from '../../utils/motion';

function FAQ() {
  const { t, content } = useLanguage();
  const faqs = content.faqs;
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null);

  const toggle = (id) => setOpenId((current) => (current === id ? null : id));

  return (
    <section className="section-padding bg-secondary-soft" id="faq">
      <div className="container-clinic">
        <SectionHeading
          eyebrow={t('faq.eyebrow')}
          title={t('faq.title')}
          subtitle={t('faq.subtitle')}
        />

        <motion.div
          className="mx-auto max-w-3xl space-y-3"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {faqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-secondary bg-white shadow-soft"
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-button-${item.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    onClick={() => toggle(item.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-ink transition hover:bg-secondary/40"
                  >
                    <span>{item.question}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                      {isOpen ? <FaMinus size={12} /> : <FaPlus size={12} />}
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-button-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                    >
                      <p className="border-t border-secondary px-5 py-4 text-sm leading-relaxed text-ink-muted">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;
