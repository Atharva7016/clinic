/**
 * Strip basic HTML / script payloads from string fields (XSS hardening).
 * Complements express-mongo-sanitize for NoSQL injection.
 */
const DANGEROUS = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;
const TAGS = /<\/?[^>]+(>|$)/g;

const scrub = (value) => {
  if (typeof value === 'string') {
    return value.replace(DANGEROUS, '').replace(TAGS, '').trim();
  }
  if (Array.isArray(value)) {
    return value.map(scrub);
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, scrub(val)])
    );
  }
  return value;
};

const sanitizeInput = (req, _res, next) => {
  if (req.body && typeof req.body === 'object') {
    req.body = scrub(req.body);
  }
  next();
};

export default sanitizeInput;
