/**
 * Reusable Google Map embed with address, hours, phone, email, directions.
 */
import { FaMapMarkerAlt, FaClock, FaPhoneAlt, FaEnvelope, FaDirections } from 'react-icons/fa';
import { CLINIC } from '../../data/clinic';
import { useLanguage } from '../../context/LanguageContext';
import { getDirectionsUrl, getGoogleMapEmbedUrl } from '../../utils/integrations';

function Map({
  embedUrl,
  address = CLINIC.contact.address,
  lat,
  lng,
  showDetails = true,
  className = '',
}) {
  const { t } = useLanguage();
  let src = embedUrl || getGoogleMapEmbedUrl();

  if (!embedUrl && lat != null && lng != null) {
    src = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  }

  const directions = getDirectionsUrl(address);

  return (
    <div className={`grid gap-6 lg:grid-cols-5 ${className}`}>
      <div className="overflow-hidden rounded-2xl border border-secondary bg-secondary-soft shadow-soft sm:rounded-3xl lg:col-span-3">
        <div className="aspect-[4/3] w-full sm:aspect-[16/10]">
          {src ? (
            <iframe
              title={`Map — ${address}`}
              src={src}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
              <FaMapMarkerAlt className="text-4xl text-primary" aria-hidden="true" />
              <p className="font-semibold text-ink">{t('map.unavailable')}</p>
            </div>
          )}
        </div>
      </div>

      {showDetails && (
        <div className="flex flex-col justify-between rounded-2xl border border-secondary bg-white p-5 shadow-soft sm:rounded-3xl sm:p-6 lg:col-span-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <FaMapMarkerAlt className="mt-1 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-ink">{t('map.address')}</p>
                <p className="text-sm text-ink-muted">{address}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <FaClock className="mt-1 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-ink">{t('map.hours')}</p>
                <p className="text-sm text-ink-muted">{t('hours.weekdays')}</p>
                <p className="text-sm text-ink-muted">{t('hours.morning')}</p>
                <p className="text-sm text-ink-muted">{t('hours.evening')}</p>
                <p className="text-sm text-ink-muted">{t('hours.sunday')}</p>
              </div>
            </div>
            <a
              href={CLINIC.contact.phoneHref}
              className="flex items-center gap-3 text-sm text-ink-muted transition hover:text-primary"
            >
              <FaPhoneAlt className="text-primary" aria-hidden="true" />
              {CLINIC.contact.phone}
            </a>
            <a
              href={CLINIC.contact.emailHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-ink-muted transition hover:text-primary"
            >
              <FaEnvelope className="text-primary" aria-hidden="true" />
              {CLINIC.contact.email}
            </a>
          </div>

          <a
            href={directions}
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-6 w-full justify-center"
          >
            <FaDirections aria-hidden="true" />
            {t('map.directions')}
          </a>
          <a
            href={CLINIC.contact.mapLink}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost mt-3 w-full justify-center"
          >
            Open in Google Maps
          </a>
        </div>
      )}
    </div>
  );
}

export default Map;
