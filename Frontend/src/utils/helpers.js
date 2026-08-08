/**
 * Utility helpers for the frontend UI.
 */

/** Merge class names conditionally */
export const cn = (...classes) => classes.filter(Boolean).join(' ');

/** Format large numbers with locale separators */
export const formatNumber = (value) =>
  new Intl.NumberFormat('en-IN').format(value);

export const getEnv = (key, fallback = '') => import.meta.env[key] ?? fallback;
