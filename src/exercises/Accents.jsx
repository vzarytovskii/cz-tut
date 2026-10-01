import { useState } from 'react';
import { useT } from '../SettingsContext';
import FeedbackMark from '../components/FeedbackMark';

const ACCENT_MAP = {
  a: ['á'], e: ['é', 'ě'], i: ['í'], o: ['ó'],
  u: ['ú', 'ů'], y: ['ý'], c: ['č'], d: ['ď'],
  n: ['ň'], r: ['ř'], s: ['š'], t: ['ť'], z: ['ž'],
};

export default function Accents({ item, onAnswer }) {
  const t = useT();
  const [chars, setChars] = useState(() => item.plain.split(''));
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);

  const handleCharClick = (pos) => {
    if (checked) return;
    // Only letters that COULD have an accent are selectable
    const base = item.plain[pos].toLowerCase();
    if (!ACCENT_MAP[base]) return;
    setSelected(selected === pos ? null : pos);
  };

  const handlePaletteClick = (ch) => {
    if (checked || selected === null) return;
    setChars((prev) => {
      const next = [...prev];
      next[selected] = ch;
      return next;
    });
    setSelected(null);
  };

  const handleRevert = () => {
    if (checked || selected === null) return;
    // Reset to original plain letter
    setChars((prev) => {
      const next = [...prev];
      next[selected] = item.plain[selected];
      return next;
    });
    setSelected(null);
  };

  const handleCheck = () => {
    setChecked(true);
    const userWord = chars.join('');
    const isCorrect = userWord === item.correct;
    onAnswer(isCorrect);
  };

  // Build palette for the selected character
  const selectedBase = selected !== null ? item.plain[selected].toLowerCase() : null;
  const palette = selectedBase ? (ACCENT_MAP[selectedBase] || []) : [];

  return (
    <div className="question-container">
      <p className="hint-text">{t('accentsInstruction')}</p>
      <div className="accent-word" lang="cs">
        {chars.map((ch, i) => {
          const canAccent = !!ACCENT_MAP[item.plain[i].toLowerCase()];
          if (checked) {
            const ok = ch === item.correct[i];
            let cls = `accent-char ${ok ? 'ok' : 'wrong-char'}`;
            if (ok && ch !== item.plain[i]) cls += ' accented';
            return <span key={i} className={cls}>{item.correct[i]}</span>;
          }
          if (!canAccent) return <span key={i} className="accent-char">{ch}</span>;
          return (
            <button
              key={i}
              type="button"
              className={`accent-char${i === selected ? ' selected' : ''}`}
              aria-pressed={i === selected}
              onClick={() => handleCharClick(i)}
            >
              {ch}
            </button>
          );
        })}
        {checked && <FeedbackMark correct={chars.join('') === item.correct} />}
      </div>

      {selected !== null && !checked && (
        <div className="accent-palette" lang="cs">
          <button onClick={handleRevert} title={t('noAccent')} aria-label={t('noAccent')}>
            {item.plain[selected]}
          </button>
          {palette.map((ch) => (
            <button key={ch} onClick={() => handlePaletteClick(ch)}>
              {ch}
            </button>
          ))}
        </div>
      )}

      <button
        className="btn btn-primary"
        style={{ alignSelf: 'center', marginTop: '1rem' }}
        onClick={handleCheck}
        disabled={checked}
      >
        {t('check')}
      </button>

      {checked && (
        <p className="hint-text" style={{ marginTop: '0.5rem' }}>
          {t('correctAnswer')} <strong lang="cs">{item.correct}</strong>
        </p>
      )}
    </div>
  );
}
