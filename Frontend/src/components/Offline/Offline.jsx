/**
 * Full-page offline fallback.
 */
import { FaWifi } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import { useOnlineStatus } from './OfflineBanner';

function OfflinePage() {
  const online = useOnlineStatus();
  const { t } = useLanguage();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <FaWifi className="mb-4 text-4xl text-slate-400" aria-hidden />
      <h1 className="text-2xl font-bold text-slate-900">
        {online ? 'Back online' : t('offline.title')}
      </h1>
      <p className="mt-2 max-w-md text-slate-600">
        {online
          ? 'Your connection is restored. Refresh the page to continue.'
          : t('offline.body')}
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-6 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
      >
        {t('common.tryAgain')}
      </button>
    </div>
  );
}

export default OfflinePage;
