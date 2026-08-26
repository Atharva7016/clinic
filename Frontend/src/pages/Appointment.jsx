/**
 * Appointment page — React Hook Form + POST /api/appointments
 * Keeps existing layout; wires fields to backend schema.
 */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import Spinner from '../components/Spinner';
import EmailSuccessModal from '../components/EmailSuccessModal';
import { CLINIC, IMAGES } from '../data/clinic';
import { TREATMENTS } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { fadeUp, viewportOnce } from '../utils/motion';
import {
  buildAppointmentWhatsAppText,
  buildAppointmentWhatsAppTextMr,
} from '../utils/integrations';
import { useAppointments } from '../hooks/useAppointments';
import { useTreatments } from '../hooks/useTreatments';

function Appointment() {
  const { t, content, isMr } = useLanguage();
  const { bookAppointment, loading } = useAppointments();
  const { treatments } = useTreatments();
  const [successOpen, setSuccessOpen] = useState(false);
  const [successPayload, setSuccessPayload] = useState(null);
  // Keep English titles as option values for the API; localize display via diseaseLabel
  const diseaseOptions =
    treatments.length > 0
      ? treatments.map((item) => item.title)
      : TREATMENTS.map((item) => item.title);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      patientName: '',
      phone: '',
      email: '',
      age: '',
      gender: '',
      disease: '',
      diseaseOther: '',
      preferredDate: '',
      preferredHour: '',
      preferredMinute: '00',
      preferredPeriod: 'AM',
      notes: '',
    },
  });

  const selectedDisease = watch('disease');
  const isOtherDisease = selectedDisease === '__other__';

  const phoneField = register('phone', {
    required: t('appointment.errors.phoneRequired'),
    pattern: {
      value: /^[0-9]{10}$/,
      message: t('appointment.errors.phoneInvalid'),
    },
  });

  const nameField = register('patientName', {
    required: t('appointment.errors.nameRequired'),
    maxLength: { value: 100, message: t('appointment.errors.nameLong') },
    pattern: {
      value: /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/,
      message: t('appointment.errors.nameInvalid'),
    },
    setValueAs: (v) => (typeof v === 'string' ? v.trim() : v),
  });

  const ageField = register('age', {
    pattern: {
      value: /^([0-9]{1,2})?$/,
      message: t('appointment.errors.ageInvalid'),
    },
    validate: (v) => {
      if (v === '' || v == null) return true;
      const n = Number(v);
      if (n < 1) return t('appointment.errors.ageMin');
      if (n > 99) return t('appointment.errors.ageMax');
      return true;
    },
    setValueAs: (v) => (v === '' || v == null ? '' : Number(v)),
  });

  const digitsOnly = (value, maxLen) => value.replace(/\D/g, '').slice(0, maxLen);

  /** Letters + spaces only; Title Case (First Letter Capital After Spaces). */
  const formatPatientName = (value) => {
    const cleaned = value.replace(/[^a-zA-Z\s]/g, '').replace(/ {2,}/g, ' ');
    return cleaned.replace(/\S+/g, (word) =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
  };

  const allowControlKeys = (e) =>
    e.ctrlKey ||
    e.metaKey ||
    e.altKey ||
    [
      'Backspace',
      'Delete',
      'Tab',
      'Escape',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
    ].includes(e.key);

  const onSubmit = async (values) => {
    try {
      const disease =
        values.disease === '__other__'
          ? values.diseaseOther.trim()
          : values.disease;

      const preferredTime = values.preferredHour
        ? `${values.preferredHour}:${values.preferredMinute || '00'} ${values.preferredPeriod || 'AM'}`
        : '';

      const response = await bookAppointment({
        patientName: values.patientName.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        ...(values.age !== '' && values.age != null ? { age: Number(values.age) } : {}),
        ...(values.gender ? { gender: values.gender } : {}),
        ...(disease ? { disease } : {}),
        ...(values.preferredDate ? { preferredDate: values.preferredDate } : {}),
        preferredTime,
        notes: values.notes.trim(),
      });

      const payload = response?.data || {};
      setSuccessPayload(payload);
      setSuccessOpen(true);
      toast.success(t('appointment.successToast'));
      reset();
    } catch (err) {
      if (err.errors?.length) {
        err.errors.forEach((e) => toast.error(e.message));
      } else {
        toast.error(err.message || t('appointment.failToast'));
      }
    }
  };

  const fieldClass = 'field-input';
  const errorClass = 'mt-1 text-xs text-red-600';

  // Local calendar date (YYYY-MM-DD) — today and future only
  const todayDate = (() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  })();

  return (
    <>
      <SEO
        title={t('pages.appointment.title')}
        description={t('pages.appointment.description')}
        path="/appointment"
      />
      <PageHero
        title={t('pages.appointment.heroTitle')}
        subtitle={t('pages.appointment.heroSubtitle')}
        image={IMAGES.clinic}
      />

      <section className="section-padding">
        <div className="container-clinic grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
          <motion.div
            className="lg:col-span-3"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="rounded-2xl border border-secondary bg-white p-5 shadow-soft sm:rounded-3xl sm:p-6 md:p-8">
              <h2 className="text-xl font-bold text-ink sm:text-2xl">
                {t('appointment.requestTitle')}
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                {t('appointment.requestSubtitle', { doctor: CLINIC.doctor.name })}
              </p>

              <form
                className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div>
                  <label htmlFor="patientName" className="mb-1.5 block text-sm font-medium text-ink">
                    {t('appointment.patientName')}
                  </label>
                  <input
                    id="patientName"
                    autoComplete="name"
                    maxLength={100}
                    className={fieldClass}
                    {...nameField}
                    onChange={(e) => {
                      e.target.value = formatPatientName(e.target.value);
                      nameField.onChange(e);
                    }}
                    onKeyDown={(e) => {
                      if (allowControlKeys(e) || e.key === ' ') return;
                      if (!/^[a-zA-Z]$/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                  {errors.patientName && (
                    <p className={errorClass}>{errors.patientName.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
                    {t('appointment.phone')}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={10}
                    pattern="[0-9]*"
                    className={fieldClass}
                    placeholder={t('appointment.phonePlaceholder')}
                    {...phoneField}
                    onChange={(e) => {
                      e.target.value = digitsOnly(e.target.value, 10);
                      phoneField.onChange(e);
                    }}
                    onKeyDown={(e) => {
                      if (allowControlKeys(e)) return;
                      if (!/^[0-9]$/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                  {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                    {t('appointment.email')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={fieldClass}
                    {...register('email', {
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: t('appointment.errors.emailInvalid'),
                      },
                    })}
                  />
                  {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="age" className="mb-1.5 block text-sm font-medium text-ink">
                    {t('appointment.age')}
                  </label>
                  <input
                    id="age"
                    type="tel"
                    inputMode="numeric"
                    maxLength={2}
                    min={1}
                    max={99}
                    pattern="[0-9]*"
                    className={fieldClass}
                    placeholder="01–99"
                    {...ageField}
                    onChange={(e) => {
                      e.target.value = digitsOnly(e.target.value, 2);
                      ageField.onChange(e);
                    }}
                    onKeyDown={(e) => {
                      if (allowControlKeys(e)) return;
                      if (!/^[0-9]$/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                  {errors.age && <p className={errorClass}>{errors.age.message}</p>}
                </div>

                <div>
                  <label htmlFor="gender" className="mb-1.5 block text-sm font-medium text-ink">
                    {t('appointment.gender')}
                  </label>
                  <select
                    id="gender"
                    className={fieldClass}
                    {...register('gender')}
                  >
                    <option value="">{t('appointment.selectGender')}</option>
                    <option value="female">{t('appointment.female')}</option>
                    <option value="male">{t('appointment.male')}</option>
                    <option value="other">{t('appointment.other')}</option>
                  </select>
                  {errors.gender && <p className={errorClass}>{errors.gender.message}</p>}
                </div>

                <div>
                  <label htmlFor="disease" className="mb-1.5 block text-sm font-medium text-ink">
                    {t('appointment.disease')}
                  </label>
                  <select
                    id="disease"
                    className={fieldClass}
                    {...register('disease')}
                  >
                    <option value="">{t('appointment.selectOption')}</option>
                    {diseaseOptions.map((title) => (
                      <option key={title} value={title}>
                        {content.diseaseLabel(title)}
                      </option>
                    ))}
                    <option value="Panchakarma">{content.diseaseLabel('Panchakarma')}</option>
                    <option value="General Consultation">
                      {content.diseaseLabel('General Consultation')}
                    </option>
                    <option value="__other__">{t('appointment.other')}</option>
                  </select>
                  {errors.disease && <p className={errorClass}>{errors.disease.message}</p>}

                  {isOtherDisease && (
                    <div className="mt-3">
                      <label
                        htmlFor="diseaseOther"
                        className="mb-1.5 block text-sm font-medium text-ink"
                      >
                        {t('appointment.diseaseOther')}
                      </label>
                      <input
                        id="diseaseOther"
                        type="text"
                        autoComplete="off"
                        placeholder={t('appointment.diseaseOtherPlaceholder')}
                        className={fieldClass}
                        {...register('diseaseOther', {
                          maxLength: { value: 120 },
                          setValueAs: (v) => (typeof v === 'string' ? v.trim() : v),
                        })}
                      />
                      {errors.diseaseOther && (
                        <p className={errorClass}>{errors.diseaseOther.message}</p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="preferredDate"
                    className="mb-1.5 block text-sm font-medium text-ink"
                  >
                    {t('appointment.preferredDate')}
                  </label>
                  <input
                    id="preferredDate"
                    type="date"
                    min={todayDate}
                    className={fieldClass}
                    {...register('preferredDate', {
                      validate: (value) =>
                        !value || value >= todayDate || t('appointment.errors.datePast'),
                    })}
                  />
                  {errors.preferredDate && (
                    <p className={errorClass}>{errors.preferredDate.message}</p>
                  )}
                </div>

                <div>
                  <span className="mb-1.5 block text-sm font-medium text-ink">
                    {t('appointment.preferredTime')}
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label htmlFor="preferredHour" className="sr-only">
                        {t('appointment.hour')}
                      </label>
                      <select
                        id="preferredHour"
                        className={fieldClass}
                        {...register('preferredHour')}
                      >
                        <option value="">{t('appointment.hour')}</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                          <option key={h} value={String(h)}>
                            {h}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="preferredMinute" className="sr-only">
                        {t('appointment.minute')}
                      </label>
                      <select
                        id="preferredMinute"
                        className={fieldClass}
                        {...register('preferredMinute')}
                      >
                        {['00', '15', '30', '45'].map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="preferredPeriod" className="sr-only">
                        {t('appointment.period')}
                      </label>
                      <select
                        id="preferredPeriod"
                        className={fieldClass}
                        {...register('preferredPeriod')}
                      >
                        <option value="AM">{t('appointment.am')}</option>
                        <option value="PM">{t('appointment.pm')}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="mb-1.5 block text-sm font-medium text-ink">
                    {t('appointment.notes')}
                  </label>
                  <textarea
                    id="notes"
                    rows={4}
                    className={fieldClass}
                    {...register('notes')}
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner className="h-4 w-4" label={t('appointment.submitting')} />{' '}
                        {t('appointment.submitting')}
                      </>
                    ) : (
                      t('appointment.submit')
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          <motion.aside
            className="space-y-4 lg:col-span-2"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="rounded-2xl bg-primary p-5 text-white shadow-soft sm:rounded-3xl sm:p-6">
              <h3 className="text-lg font-semibold">{t('appointment.chatTitle')}</h3>
              <p className="mt-2 text-sm text-secondary">{t('appointment.chatBody')}</p>
              <div className="mt-5 flex flex-col gap-3">
                <a href={CLINIC.contact.phoneHref} className="btn-outline w-full justify-center">
                  <FaPhoneAlt aria-hidden="true" /> {CLINIC.contact.phone}
                </a>
                <a
                  href={CLINIC.contact.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-accent w-full justify-center"
                >
                  <FaWhatsapp aria-hidden="true" /> {t('appointment.whatsappConsult')}
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-secondary bg-secondary-soft p-5 sm:rounded-3xl sm:p-6">
              <h3 className="font-semibold text-ink">{t('appointment.hoursTitle')}</h3>
              <p className="mt-2 text-sm text-ink-muted">{t('hours.weekdays')}</p>
              <p className="text-sm text-ink-muted">{t('hours.morning')}</p>
              <p className="text-sm text-ink-muted">{t('hours.evening')}</p>
              <p className="text-sm text-ink-muted">{t('hours.sunday')}</p>
            </div>
          </motion.aside>
        </div>
      </section>

      <EmailSuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        appointment={successPayload?.appointment}
        whatsappUrl={isMr ? undefined : successPayload?.whatsappUrl}
        title={t('appointment.successTitle')}
        message={t('appointment.successMessage')}
        whatsappLabel={t('appointment.whatsappContinue')}
        closeLabel={t('appointment.close')}
        buildWhatsAppText={
          isMr ? buildAppointmentWhatsAppTextMr : buildAppointmentWhatsAppText
        }
      />
    </>
  );
}

export default Appointment;
