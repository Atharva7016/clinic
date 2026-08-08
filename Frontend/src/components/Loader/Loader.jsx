/**
 * Full-screen branded loader shown during lazy route loading.
 */
import { motion } from 'framer-motion';
import { CLINIC } from '../../data/clinic';

function Loader() {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-surface"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <motion.div
        className="h-14 w-14 rounded-full border-4 border-secondary border-t-primary"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
      />
      <p className="text-sm font-medium text-ink-muted">{CLINIC.shortName}</p>
    </div>
  );
}

export default Loader;
