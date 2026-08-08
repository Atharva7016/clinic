/**
 * Simple structured logger (console-based for Phase 3).
 * Swap for Winston/Pino later without changing call sites.
 */
const stamp = () => new Date().toISOString();

const logger = {
  info: (...args) => console.log(`[INFO] ${stamp()}`, ...args),
  warn: (...args) => console.warn(`[WARN] ${stamp()}`, ...args),
  error: (...args) => console.error(`[ERROR] ${stamp()}`, ...args),
  debug: (...args) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] ${stamp()}`, ...args);
    }
  },
};

export default logger;
