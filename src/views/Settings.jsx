import { useSettings, useT, SIZES } from '../SettingsContext';
import { LANGUAGES } from '../i18n';
import { resetProgress } from '../utils';

const SIZE_LABELS = {
  standard: 'sizeStandard',
  large: 'sizeLarge',
  xlarge: 'sizeXLarge',
  classroom: 'sizeClassroom',
};

export default function Settings() {
  const { settings, update } = useSettings();
  const t = useT();

  return (
    <main className="settings">
      <h2>{t('settings')}</h2>
      <div className="setting-row">
        <label htmlFor="setting-lang">{t('language')}</label>
        <select id="setting-lang" value={settings.lang} onChange={(e) => update({ lang: e.target.value })}>
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code} lang={l.code}>{l.name}</option>
          ))}
        </select>
      </div>
      <div className="setting-row">
        <label htmlFor="setting-theme">{t('theme')}</label>
        <select id="setting-theme" value={settings.theme} onChange={(e) => update({ theme: e.target.value })}>
          <option value="auto">{t('themeAuto')}</option>
          <option value="light">{t('themeLight')}</option>
          <option value="dark">{t('themeDark')}</option>
        </select>
      </div>
      <div className="setting-row">
        <label htmlFor="setting-size">{t('textSize')}</label>
        <select id="setting-size" value={settings.size} onChange={(e) => update({ size: e.target.value })}>
          {SIZES.map((s) => (
            <option key={s} value={s}>{t(SIZE_LABELS[s])}</option>
          ))}
        </select>
      </div>
      <div className="setting-row">
        <label htmlFor="setting-advance">{t('autoAdvance')}</label>
        <select
          id="setting-advance"
          value={settings.autoAdvance ? 'on' : 'off'}
          onChange={(e) => update({ autoAdvance: e.target.value === 'on' })}
        >
          <option value="on">{t('autoAdvanceOn')}</option>
          <option value="off">{t('autoAdvanceOff')}</option>
        </select>
      </div>
      <div className="setting-row">
        <button
          className="btn-danger"
          onClick={() => {
            if (confirm(t('resetConfirm'))) {
              resetProgress();
            }
          }}
        >
          {t('resetProgress')}
        </button>
      </div>
    </main>
  );
}
