import { useEffect, useState } from 'react';
import { useSettings, useT, SIZES } from '../SettingsContext';

const SIZE_LABELS = {
  standard: 'sizeStandard',
  large: 'sizeLarge',
  xlarge: 'sizeXLarge',
  classroom: 'sizeClassroom',
};

function useSystemDarkMode() {
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const update = (event) => setSystemDark(event.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return systemDark;
}

export default function HeaderAppearanceControls() {
  const { settings, update } = useSettings();
  const t = useT();
  const systemDark = useSystemDarkMode();
  const dark = settings.theme === 'auto' ? systemDark : settings.theme === 'dark';

  return (
    <div className="header-appearance">
      <div
        className="theme-switch"
        role="group"
        aria-label={t('theme')}
        style={{ '--switch-count': 2, '--switch-active': dark ? 1 : 0 }}
      >
        <span className="theme-switch-thumb" aria-hidden="true" />
        <button
          type="button"
          className="theme-switch-option"
          aria-label={t('themeLight')}
          aria-pressed={!dark}
          onClick={() => update({ theme: 'light' })}
        >
          <i className="fa-solid fa-sun" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="theme-switch-option"
          aria-label={t('themeDark')}
          aria-pressed={dark}
          onClick={() => update({ theme: 'dark' })}
        >
          <i className="fa-solid fa-moon" aria-hidden="true" />
        </button>
      </div>
      <div
        className="theme-switch size-switch"
        role="group"
        aria-label={t('textSize')}
        style={{
          '--switch-count': SIZES.length,
          '--switch-active': Math.max(0, SIZES.indexOf(settings.size)),
        }}
      >
        <span className="theme-switch-thumb" aria-hidden="true" />
        {SIZES.map((size, index) => (
          <button
            key={size}
            type="button"
            className="theme-switch-option size-switch-option"
            aria-label={t(SIZE_LABELS[size])}
            aria-pressed={settings.size === size}
            onClick={() => update({ size })}
          >
            <span aria-hidden="true" style={{ fontSize: `${0.8 + index * 0.2}rem` }}>A</span>
          </button>
        ))}
      </div>
    </div>
  );
}
