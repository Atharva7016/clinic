/**
 * Success modal after appointment booking — Continue on WhatsApp CTA.
 */
import { AnimatePresence, motion } from 'framer-motion';
import { FaCheckCircle, FaWhatsapp, FaTimes } from 'react-icons/fa';
import { buildAppointmentWhatsAppText, buildWhatsAppUrl } from '../../utils/integrations';

function EmailSuccessModal({
  open,
  onClose,
  appointment,
  whatsappUrl: whatsappUrlProp,
  title = 'Appointment booked!',
  message = 'Thank you. A confirmation email will be sent if SMTP is configured. We will contact you shortly.',
  whatsappLabel = 'Continue on WhatsApp',
  closeLabel = 'Close',
  buildWhatsAppText = buildAppointmentWhatsAppText,
}) {
  const href =
    whatsappUrlProp ||
    buildWhatsAppUrl(buildWhatsAppText(appointment || {}));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-primary-dark/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-modal-title"
        >
          <motion.div
            className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-lift"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary"
              aria-label="Close"
            >
              <FaTimes />
            </button>

            <div className="text-center">
              <FaCheckCircle className="mx-auto text-5xl text-primary" aria-hidden="true" />
              <h2 id="success-modal-title" className="mt-4 text-2xl font-bold text-ink">
                {title}
              </h2>
              <p className="mt-3 text-sm text-ink-muted">{message}</p>

              <div className="mt-6 flex flex-col gap-3">
                {href && (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                  >
                    <FaWhatsapp aria-hidden="true" />
                    {whatsappLabel}
                  </a>
                )}
                <button type="button" onClick={onClose} className="btn-ghost">
                  {closeLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EmailSuccessModal;
