import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LANGUAGES, detectLanguage, translate, exerciseText } from './i18n';

const SettingsContext = createContext();

export const SIZES = ['standard', 'large', 'xlarge', 'classroom'];
const DEFAULT_SETTINGS = { theme: 'auto', size: 'standard', autoAdvance: true };

function loadSettings() {
  let stored = {};
  try {
    const raw = localStorage.getItem('cz-settings');
    if (raw) stored = JSON.parse(raw) || {};
  } catch { /* noop */ }
  const settings = { ...DEFAULT_SETTINGS, ...stored };
  if (!SIZES.includes(settings.size)) settings.size = 'standard';
  if (!LANGUAGES.some((l) => l.code === settings.lang)) settings.lang = detectLanguage();
  return settings;
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    try {
      localStorage.setItem('cz-settings', JSON.stringify(settings));
    } catch { /* noop */ }
    if (settings.theme === 'auto') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', settings.theme);
    }
    document.documentElement.lang = settings.lang;
    if (settings.size === 'standard') {
      document.documentElement.removeAttribute('data-size');
    } else {
      document.documentElement.setAttribute('data-size', settings.size);
    }
  }, [settings]);

  const update = (patch) => setSettings((s) => ({ ...s, ...patch }));

  return (
    <SettingsContext.Provider value={{ settings, update }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}

export function useT() {
  const { settings } = useContext(SettingsContext);
  const lang = settings.lang;
  const t = useCallback((key, vars) => translate(lang, key, vars), [lang]);
  t.exercise = (key, ex) => exerciseText(lang, key, ex);
  t.lang = lang;
  return t;
}
