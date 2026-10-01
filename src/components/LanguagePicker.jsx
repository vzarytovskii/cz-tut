import { useSettings, useT } from '../SettingsContext';
import { LANGUAGES } from '../i18n';

export default function LanguagePicker() {
  const { settings, update } = useSettings();
  const t = useT();

  return (
    <label className="lang-picker">
      <span aria-hidden="true">{settings.lang.toUpperCase()}</span>
      <i className="fa-solid fa-chevron-down lang-picker-caret" aria-hidden="true" />
      <select
        value={settings.lang}
        onChange={(e) => update({ lang: e.target.value })}
        aria-label={t('language')}
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code} lang={l.code}>{l.name}</option>
        ))}
      </select>
    </label>
  );
}
