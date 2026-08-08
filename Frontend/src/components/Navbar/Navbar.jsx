/**
 * Sticky white navbar — mobile: logo, names, WhatsApp, EN/मराठी; desktop adds links + Book.
 */
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { CLINIC, NAV_LINKS } from '../../data/clinic';
import { useLanguage } from '../../context/LanguageContext';
import { cn } from '../../utils/helpers';

function LangToggle({ className, compact = false }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-center rounded-full border border-secondary bg-secondary-soft p-0.5 font-semibold',
        compact ? 'text-[10px]' : 'text-xs',
        className
      )}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang('en')}
        className={cn(
          'rounded-full transition',
          compact ? 'min-h-8 px-2' : 'min-h-9 px-2.5',
          lang === 'en' ? 'bg-primary text-white' : 'text-ink-muted hover:text-primary'
        )}
        aria-pressed={lang === 'en'}
      >
        {t('nav.langEn')}
      </button>
      <button
        type="button"
        onClick={() => setLang('mr')}
        className={cn(
          'rounded-full transition',
          compact ? 'min-h-8 px-2' : 'min-h-9 px-2.5',
          lang === 'mr' ? 'bg-primary text-white' : 'text-ink-muted hover:text-primary'
        )}
        aria-pressed={lang === 'mr'}
      >
        {t('nav.langMr')}
      </button>
    </div>
  );
}

function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const linkClass = ({ isActive }) =>
    cn(
      'relative text-sm font-medium text-ink transition-colors duration-300 hover:text-primary',
      isActive && 'text-primary'
    );

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-secondary/80 bg-white transition-shadow duration-300',
        scrolled || open ? 'shadow-soft' : ''
      )}
    >
      <nav
        className="container-clinic flex h-16 items-center justify-between gap-2 md:h-20"
        aria-label="Primary"
      >
        <Link
          to="/"
          className="group flex min-w-0 flex-1 items-center gap-2 sm:gap-3"
          onClick={close}
          aria-label={`${CLINIC.shortName} home`}
        >
          <img
            src={CLINIC.logo}
            alt={`${CLINIC.shortName} logo`}
            className="h-9 w-9 shrink-0 rounded-full object-cover shadow-soft sm:h-10 sm:w-10 md:h-11 md:w-11"
          />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-xs font-bold tracking-tight text-primary xs:text-sm md:text-base">
              {CLINIC.shortName}
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-wider text-ink-muted sm:block">
              {t('nav.tagline')}
            </span>
            <span className="truncate text-[11px] text-ink-muted sm:text-xs">
              Dr. Gauri Patil
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-5 lg:flex xl:gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={linkClass}
                end={link.path === '/' || link.path === '/appointment'}
              >
                {({ isActive }) => (
                  <>
                    {t(link.labelKey)}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-primary"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <LangToggle compact className="inline-flex" />
          <a
            href={CLINIC.contact.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:brightness-110 sm:h-11 sm:w-11"
            aria-label={t('common.whatsapp')}
          >
            <FaWhatsapp className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden="true" />
          </a>
          <Link
            to="/appointment"
            className="hidden min-h-11 items-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark lg:inline-flex"
          >
            {t('nav.book')}
          </Link>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary sm:h-11 sm:w-11 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-primary-dark/40 lg:hidden"
              aria-label={t('nav.closeOverlay')}
              onClick={close}
            />
            <motion.aside
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,20rem)] flex-col bg-white shadow-lift safe-pr lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-secondary px-4 py-4">
                <p className="font-semibold text-primary">{t('nav.menu')}</p>
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary"
                  aria-label={t('nav.closeMenu')}
                  onClick={close}
                >
                  <FiX size={22} />
                </button>
              </div>

              <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
                {NAV_LINKS.map((link, index) => (
                  <motion.li
                    key={link.path}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * index }}
                  >
                    <NavLink
                      to={link.path}
                      end={link.path === '/' || link.path === '/appointment'}
                      onClick={close}
                      className={({ isActive }) =>
                        cn(
                          'flex min-h-12 items-center rounded-xl px-4 text-base font-medium',
                          isActive
                            ? 'bg-secondary text-primary'
                            : 'text-ink hover:bg-secondary/60'
                        )
                      }
                    >
                      {t(link.labelKey)}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <div className="space-y-3 border-t border-secondary p-4 safe-pb">
                <Link to="/appointment" onClick={close} className="btn-primary w-full">
                  {t('nav.book')}
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
