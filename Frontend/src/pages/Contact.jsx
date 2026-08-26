/**
 * Contact page — existing info cards + map; contact form posts to /api/contact.
 */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import Spinner from '../components/Spinner';
import Map from '../components/Map';
import EmailSuccessModal from '../components/EmailSuccessModal';
import { CLINIC, IMAGES } from '../data/clinic';
import { useLanguage } from '../context/LanguageContext';
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion';
import {
  buildContactWhatsAppText,
  buildWhatsAppUrl,
} from '../utils/integrations';
import { useContact } from '../hooks/useContact';

function Contact() {
  const { t } = useLanguage();
  const { sendMessage, loading } = useContact();
  const [successOpen, setSuccessOpen] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      const payload = {
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      };

      const response = await sendMessage(payload);
      const url =
        response?.data?.whatsappUrl ||
        buildWhatsAppUrl(buildContactWhatsAppText(payload));

      setWhatsappUrl(url);
      toast.success(t('contact.successToast'));
      reset();
      setSuccessOpen(true);

      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } catch (err) {
      if (err.errors?.length) {
        err.errors.forEach((e) => toast.error(e.message));
      } else {
        toast.error(err.message || t('contact.failToast'));
      }
    }
  };

  const cards = [
    {
      id: 'address',
      icon: FaMapMarkerAlt,
      title: t('contact.address'),
      body: t('clinic.address'),
    },
    {
      id: 'phone',
      icon: FaPhoneAlt,
      title: t('contact.phone'),
      body: t('clinic.phone'),
      href: CLINIC.contact.phoneHref,
    },
    {
      id: 'email',
      icon: FaEnvelope,
      title: t('contact.email'),
      body: CLINIC.contact.email,
      href: CLINIC.contact.emailHref,
    },
    {
      id: 'hours',
      icon: FaClock,
      title: t('contact.hours'),
      body: `${t('hours.weekdays')}\n${t('hours.morning')}\n${t('hours.evening')}\n${t('hours.sunday')}`,
    },
  ];

  const fieldClass = 'field-input';
  const errorClass = 'mt-1 text-xs text-red-600';

  return (
    <>
      <SEO
        title={t('pages.contact.title')}
        description={t('pages.contact.description')}
        path="/contact"
      />
      <PageHero
        title={t('pages.contact.heroTitle')}
        subtitle={t('pages.contact.heroSubtitle')}
        image={IMAGES.reception}
      />

      <section className="section-padding">
        <div className="container-clinic">
          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {cards.map(({ id, icon: Icon, title, body, href }) => (
              <motion.div
                key={id}
                variants={fadeUp}
                className="rounded-2xl border border-secondary bg-white p-5 shadow-soft"
              >
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon aria-hidden="true" />
                </span>
                <h2 className="font-semibold text-ink">{title}</h2>
                {href ? (
                  <a
                    href={href}
                    {...(href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="mt-2 block whitespace-pre-line text-sm text-ink-muted transition hover:text-primary"
                  >
                    {body}
                  </a>
                ) : (
                  <p className="mt-2 whitespace-pre-line text-sm text-ink-muted">{body}</p>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 rounded-2xl border border-secondary bg-white p-5 shadow-soft sm:mt-12 sm:rounded-3xl sm:p-6 md:p-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h2 className="text-2xl font-bold text-ink">{t('contact.formTitle')}</h2>
            <p className="mt-2 text-sm text-ink-muted">{t('contact.formSubtitle')}</p>

            <form
              className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-ink">
                  {t('contact.name')}
                </label>
                <input
                  id="contact-name"
                  autoComplete="name"
                  className={fieldClass}
                  {...register('name', {
                    required: t('contact.errors.nameRequired'),
                    pattern: {
                      value: /^[A-Za-z\u0900-\u097F]+(?: [A-Za-z\u0900-\u097F]+)*$/,
                      message: t('contact.errors.nameInvalid'),
                    },
                    onChange: (e) => {
                      // Letters + spaces only (no digits); Title Case for Latin letters
                      let value = e.target.value.replace(/[0-9\u0966-\u096F]/g, '');
                      value = value.replace(/[^A-Za-z\u0900-\u097F\s]/g, '');
                      value = value.replace(/\s+/g, ' ');
                      e.target.value = value.replace(
                        /(^|\s)([a-zA-Z])/g,
                        (_, sep, letter) => sep + letter.toUpperCase()
                      );
                    },
                  })}
                />
                {errors.name && <p className={errorClass}>{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-ink">
                  {t('contact.phoneLabel')}
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  className={fieldClass}
                  {...register('phone', {
                    required: t('contact.errors.phoneRequired'),
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: t('contact.errors.phoneInvalid'),
                    },
                    onChange: (e) => {
                      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    },
                  })}
                />
                {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-ink">
                  {t('contact.emailLabel')}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  className={fieldClass}
                  {...register('email')}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-1.5 block text-sm font-medium text-ink"
                >
                  {t('contact.subject')}
                </label>
                <input
                  id="contact-subject"
                  className={fieldClass}
                  {...register('subject', {
                    onChange: (e) => {
                      e.target.value = e.target.value.replace(
                        /(^|\s)([a-zA-Z])/g,
                        (_, sep, letter) => sep + letter.toUpperCase()
                      );
                    },
                  })}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-sm font-medium text-ink"
                >
                  {t('contact.message')}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  className={fieldClass}
                  {...register('message', {
                    required: t('contact.errors.messageRequired'),
                    maxLength: {
                      value: 2000,
                      message: t('contact.errors.messageRequired'),
                    },
                  })}
                />
                {errors.message && <p className={errorClass}>{errors.message.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner className="h-4 w-4" label={t('contact.sending')} />{' '}
                      {t('contact.sending')}
                    </>
                  ) : (
                    t('contact.send')
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          <div className="mt-10 space-y-6 sm:mt-12 sm:space-y-8">
            <Map />

            <div className="rounded-2xl bg-primary p-5 text-white sm:rounded-3xl sm:p-8">
              <h2 className="text-xl font-bold">{t('contact.connect')}</h2>
              <p className="mt-3 text-sm text-secondary">
                Follow {CLINIC.shortName} for wellness tips, clinic updates, and patient stories.
              </p>
              <div className="mt-6 flex gap-3">
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
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition hover:bg-accent hover:text-ink"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={CLINIC.contact.phoneHref} className="btn-outline w-full sm:w-auto">
                  <FaPhoneAlt aria-hidden="true" /> {t('contact.callNow')}
                </a>
                <a
                  href={CLINIC.contact.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-accent w-full sm:w-auto"
                >
                  {t('contact.whatsappUs')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EmailSuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        whatsappUrl={whatsappUrl}
        title={t('contact.successTitle')}
        message={t('contact.successMessage')}
        whatsappLabel={t('appointment.whatsappContinue')}
        closeLabel={t('appointment.close')}
      />
    </>
  );
}

export default Contact;
