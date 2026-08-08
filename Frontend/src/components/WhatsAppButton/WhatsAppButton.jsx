/**
 * Floating WhatsApp button — fixed bottom-right, icon centered, notch-safe.
 */
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { buildWhatsAppUrl } from '../../utils/integrations';

function WhatsAppButton({ message }) {
  const href = buildWhatsAppUrl(message);

  if (!href) return null;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      style={{
        // Keep the circle clear of home indicators / notches without padding the icon
        bottom: 'max(1.25rem, env(safe-area-inset-bottom, 0px))',
        right: 'max(1rem, env(safe-area-inset-right, 0px))',
      }}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaWhatsapp className="h-7 w-7 shrink-0" aria-hidden="true" />
    </motion.a>
  );
}

export default WhatsAppButton;
