/**
 * Slugify helper for treatment titles.
 * @param {string} text
 * @returns {string}
 */
export const slugify = (text = '') =>
  text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

export default slugify;
