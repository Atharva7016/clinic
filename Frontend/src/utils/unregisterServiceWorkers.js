/**
 * Unregister any leftover service workers for this origin.
 * This project does not ship a SW; stale ones (old PWA / other apps on
 * the same localhost port) intercept API calls and surface FetchEvent errors.
 */
export async function unregisterServiceWorkers() {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((registration) => registration.unregister()));

    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }
  } catch {
    // Non-fatal — app works without this cleanup
  }
}
