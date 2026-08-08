/**
 * Lightweight API smoke checks for local/staging.
 * Usage (API must be running): node scripts/smoke.js
 */
const base = process.env.API_URL || 'http://127.0.0.1:5001/api';

const check = async (path, opts) => {
  const res = await fetch(`${base}${path}`, opts);
  const text = await res.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }
  return { path, status: res.status, ok: res.ok, body };
};

const run = async () => {
  const results = [];
  results.push(await check('/health'));
  results.push(await check('/treatments'));
  results.push(await check('/gallery'));
  results.push(await check('/testimonials'));

  const failed = results.filter((r) => !r.ok);
  for (const r of results) {
    console.log(`${r.ok ? 'OK' : 'FAIL'} ${r.status} ${r.path}`);
  }

  if (failed.length) {
    process.exitCode = 1;
  }
};

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
