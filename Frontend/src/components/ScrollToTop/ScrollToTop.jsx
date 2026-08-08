/**
 * Scroll restoration on route change + floating “back to top” button.
 */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

function ScrollToTop() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  // Jump to top whenever the route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lift transition hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          style={{
            bottom: 'max(5.5rem, calc(env(safe-area-inset-bottom, 0px) + 4.25rem))',
            right: 'max(1rem, env(safe-area-inset-right, 0px))',
          }}
          aria-label="Scroll to top"
        >
          <FaArrowUp className="h-4 w-4 shrink-0" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTop;
