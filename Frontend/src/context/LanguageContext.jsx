/**
 * Language context — EN / मराठी site-wide switch (persisted).
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from '../i18n/en';
import mr from '../i18n/mr';
import {
  TREATMENTS_MR,
  PANCHAKARMA_MR,
  WHY_CHOOSE_MR,
  FAQS_MR,
  TIMELINE_MR,
  TESTIMONIALS_MR,
  DISEASE_LABELS_MR,
} from '../i18n/contentMr';
import {
  TREATMENTS,
  PANCHAKARMA,
  STATISTICS,
  WHY_CHOOSE,
  FAQS,
  TIMELINE,
  TESTIMONIALS,
} from '../data/content';

const STORAGE_KEY = 'clinic-lang';
const dictionaries = { en, mr };

const LanguageContext = createContext(null);

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

function format(str, vars = {}) {
  if (typeof str !== 'string') return str;
  return str.replace(/\{(\w+)\}/g, (_, key) =>
    vars[key] != null ? String(vars[key]) : `{${key}}`
  );
}

function mergeById(list, overlay, idKey = 'id') {
  if (!overlay) return list;
  return list.map((item) => {
    const key = item[idKey];
    const patch = overlay[key] ?? overlay[String(key)];
    return patch ? { ...item, ...patch } : item;
  });
}

/** Localize testimonials by id or English patient name */
function localizeTestimonials(list, overlay) {
  if (!overlay || !list?.length) return list;
  return list.map((item) => {
    const patch =
      overlay[item.id] ??
      overlay[String(item.id)] ??
      overlay[item.name] ??
      overlay[item.patientName];
    return patch ? { ...item, name: patch.name || item.name, review: patch.review || item.review } : item;
  });
}

function readStoredLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'mr' || stored === 'en') return stored;
  } catch {
    /* ignore */
  }
  return 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLang);

  const setLang = useCallback((next) => {
    setLangState(next === 'mr' ? 'mr' : 'en');
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === 'mr' ? 'en' : 'mr'));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang === 'mr' ? 'mr' : 'en';
  }, [lang]);

  const dict = dictionaries[lang] || en;

  const t = useCallback(
    (path, vars) => {
      const value = getByPath(dict, path);
      if (value == null) {
        const fallback = getByPath(en, path);
        return format(fallback ?? path, vars);
      }
      return format(value, vars);
    },
    [dict]
  );

  const content = useMemo(() => {
    if (lang !== 'mr') {
      return {
        treatments: TREATMENTS,
        panchakarma: PANCHAKARMA,
        statistics: STATISTICS,
        whyChoose: WHY_CHOOSE,
        faqs: FAQS,
        timeline: TIMELINE,
        testimonials: TESTIMONIALS,
        diseaseLabel: (title) => title,
        localizeTestimonials: (list) => list,
      };
    }

    const stats = STATISTICS.map((s) => ({
      ...s,
      label: dict.statistics[s.id] || s.label,
    }));

    return {
      treatments: mergeById(TREATMENTS, TREATMENTS_MR),
      panchakarma: mergeById(PANCHAKARMA, PANCHAKARMA_MR),
      statistics: stats,
      whyChoose: mergeById(WHY_CHOOSE, WHY_CHOOSE_MR),
      faqs: mergeById(FAQS, FAQS_MR),
      timeline: TIMELINE.map((item) => {
        const patch = TIMELINE_MR[item.year];
        return patch ? { ...item, ...patch } : item;
      }),
      testimonials: localizeTestimonials(TESTIMONIALS, TESTIMONIALS_MR),
      diseaseLabel: (title) => DISEASE_LABELS_MR[title] || title,
      localizeTestimonials: (list) => localizeTestimonials(list, TESTIMONIALS_MR),
    };
  }, [lang, dict]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang,
      isMr: lang === 'mr',
      t,
      content,
    }),
    [lang, setLang, toggleLang, t, content]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
