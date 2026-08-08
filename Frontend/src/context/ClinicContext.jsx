/**
 * UI context placeholder for future theme/clinic preferences.
 * Phase 2 keeps this minimal — no backend state.
 */
import { createContext, useContext, useMemo, useState } from 'react';
import { CLINIC } from '../data/clinic';

const ClinicContext = createContext(null);

export function ClinicProvider({ children }) {
  const [newsletterJoined, setNewsletterJoined] = useState(false);

  const value = useMemo(
    () => ({
      clinic: CLINIC,
      newsletterJoined,
      setNewsletterJoined,
    }),
    [newsletterJoined]
  );

  return <ClinicContext.Provider value={value}>{children}</ClinicContext.Provider>;
}

// Hook co-located with provider for convenience (acceptable Fast Refresh trade-off)
// eslint-disable-next-line react-refresh/only-export-components
export function useClinic() {
  const ctx = useContext(ClinicContext);
  if (!ctx) {
    throw new Error('useClinic must be used within ClinicProvider');
  }
  return ctx;
}
