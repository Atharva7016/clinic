/**
 * Friendly server / unexpected failure page (route-level).
 */
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

function ServerError() {
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title={t('serverError.title')}
        description={t('serverError.body')}
        path="/500"
        noIndex
      />
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <p className="text-sm font-semibold text-teal-700">500</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{t('serverError.title')}</h1>
        <p className="mt-3 max-w-md text-slate-600">{t('serverError.body')}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
          >
            {t('common.tryAgain')}
          </button>
          <Link
            to="/"
            className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-white"
          >
            {t('serverError.home')}
          </Link>
        </div>
      </div>
    </>
  );
}

export default ServerError;
