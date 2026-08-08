/**
 * 404 page.
 */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { fadeUp } from '../utils/motion';

function NotFound() {
  const { t } = useLanguage();

  return (
    <>
      <SEO title={t('notFound.title')} description={t('notFound.body')} path="/404" />
      <section className="flex min-h-[70vh] items-center justify-center px-4 pt-28">
        <motion.div
          className="max-w-lg text-center"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <p className="text-6xl font-bold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold text-ink">{t('notFound.title')}</h1>
          <p className="mt-3 text-ink-muted">{t('notFound.body')}</p>
          <Link to="/" className="btn-primary mt-8 inline-flex">
            {t('notFound.home')}
          </Link>
        </motion.div>
      </section>
    </>
  );
}

export default NotFound;
