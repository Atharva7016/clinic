/**
 * Site footer — clinic info, quick links, treatments, contact, newsletter UI, social.
 * Newsletter is UI-only (no backend submit).
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from 'react-icons/fa';
import { CLINIC, NAV_LINKS } from '../../data/clinic';
import { useLanguage } from '../../context/LanguageContext';

function Footer() {
  const { t, content } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="relative overflow-hidden bg-primary-dark text-secondary">
      <div
        className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-primary/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-clinic relative section-padding !pb-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img
                src={CLINIC.logo}
                alt={`${CLINIC.shortName} logo`}
                className="h-11 w-11 rounded-full object-cover ring-2 ring-accent/50"
              />
              <div>
                <p className="font-bold text-white">{CLINIC.shortName}</p>
                <p className="text-xs text-secondary/80">{t('nav.tagline')}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-secondary/90">
              {t('footer.blurb', {
                doctor: CLINIC.doctor.name,
                qualification: CLINIC.doctor.qualification,
              })}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {[
                { Icon: FaFacebookF, href: CLINIC.social.facebook, label: 'Facebook' },
                { Icon: FaInstagram, href: CLINIC.social.instagram, label: 'Instagram' },
                CLINIC.social.youtube
                  ? { Icon: FaYoutube, href: CLINIC.social.youtube, label: 'YouTube' }
                  : null,
              ]
                .filter(Boolean)
                .map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-accent hover:text-ink"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="inline-flex min-h-11 items-center text-sm text-secondary/90 transition hover:text-accent"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.treatments')}
            </h3>
            <ul className="space-y-1">
              {content.treatments.slice(0, 6).map((item) => (
                <li key={item.id}>
                  <Link
                    to="/treatments"
                    className="inline-flex min-h-11 items-center text-sm text-secondary/90 transition hover:text-accent"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.contactHours')}
            </h3>
            <ul className="mb-6 space-y-3 text-sm">
              <li className="flex gap-3">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                <span>{t('clinic.address')}</span>
              </li>
              <li className="flex gap-3">
                <FaClock className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  {t('hours.weekdays')}
                  <br />
                  {t('hours.morning')}
                  <br />
                  {t('hours.evening')}
                  <br />
                  {t('hours.sunday')}
                </span>
              </li>
              <li>
                <a
                  href={CLINIC.contact.phoneHref}
                  className="flex min-h-11 items-center gap-3 transition hover:text-accent"
                >
                  <FaPhoneAlt className="text-accent" aria-hidden="true" />
                  {t('clinic.phone')}
                </a>
              </li>
              <li>
                <a
                  href={CLINIC.contact.emailHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-3 break-all transition hover:text-accent"
                >
                  <FaEnvelope className="shrink-0 text-accent" aria-hidden="true" />
                  {CLINIC.contact.email}
                </a>
              </li>
            </ul>

            <form onSubmit={handleNewsletter} className="space-y-2" noValidate>
              <label htmlFor="newsletter-email" className="text-sm font-medium text-white">
                {t('footer.newsletter')}
              </label>
              <div className="flex min-h-12 overflow-hidden rounded-full border border-white/20 bg-white/10">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.emailPlaceholder')}
                  className="w-full bg-transparent px-4 py-3 text-base text-white placeholder:text-secondary/60 focus:outline-none sm:text-sm"
                  aria-label={t('footer.emailAria')}
                />
                <button
                  type="submit"
                  className="shrink-0 bg-accent px-5 text-sm font-semibold text-ink transition hover:bg-accent-light"
                >
                  {t('footer.join')}
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-accent-light" role="status">
                  {t('footer.subscribed')}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-center text-xs text-secondary/70 sm:mt-12 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {CLINIC.name}. {t('footer.rights')}
          </p>
          <p>
            {t('footer.careBy', {
              doctor: CLINIC.doctor.name,
              qualification: CLINIC.doctor.qualification,
            })}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
