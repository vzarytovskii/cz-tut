import { useState, useEffect } from 'react';
import { useT } from '../SettingsContext';

const SELECTION_KEY = 'cz-home-selection';

function loadSelection(valid) {
  try {
    const saved = JSON.parse(localStorage.getItem(SELECTION_KEY));
    if (Array.isArray(saved)) return saved.filter((k) => valid.includes(k));
  } catch { /* noop */ }
  return [];
}

export default function Home({ data, onStart }) {
  const t = useT();
  const totalItems = (ex) =>
    Object.values(ex.items).reduce((sum, arr) => sum + arr.length, 0);

  const keys = Object.entries(data.exercises)
    .filter(([, ex]) => totalItems(ex) > 0)
    .map(([key]) => key);

  const [selected, setSelected] = useState(() => loadSelection(keys));

  useEffect(() => {
    try { localStorage.setItem(SELECTION_KEY, JSON.stringify(selected)); } catch { /* noop */ }
  }, [selected]);

  const toggle = (key) =>
    setSelected((s) => (s.includes(key) ? s.filter((k) => k !== key) : [...s, key]));

  // Keep data order so the route is stable regardless of click order.
  const ordered = keys.filter((k) => selected.includes(k));

  return (
    <main className="home">
      <fieldset className="exercise-picker">
        <legend className="home-legend">
          <span className="home-title">{t('chooseExercises')}</span>
          <span className="home-hint">{t('chooseHint')}</span>
        </legend>
        <div className="exercise-list">
          {keys.map((key) => {
            const ex = data.exercises[key];
            const text = t.exercise(key, ex);
            const checked = selected.includes(key);
            return (
              <label key={key} className={`exercise-card selectable${checked ? ' is-selected' : ''}`}>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggle(key)}
                />
                <span className="icon"><i className={`fa-solid fa-${ex.icon || 'book'}`} aria-hidden="true" /></span>
                <span className="info">
                  <span className="card-title">{text.label}</span>
                  <span className="card-desc">{text.description}</span>
                </span>
                <span className="card-check" aria-hidden="true">
                  <i className="fa-solid fa-check" />
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="home-actions">
        <div className="home-actions-inner">
          <p className="home-selection" aria-live="polite">
            {ordered.length > 0 && (
              <>
                {t('selectedCount', { n: ordered.length })}
                <button type="button" className="link-btn" onClick={() => setSelected([])}>
                  {t('clearSelection')}
                </button>
              </>
            )}
          </p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onStart(keys)}
          >
            <i className="fa-solid fa-shuffle" aria-hidden="true" /> {t('startAll')}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={ordered.length === 0}
            onClick={() => onStart(ordered)}
          >
            <i className="fa-solid fa-play" aria-hidden="true" /> {t('startSelected')}
            {ordered.length > 0 && <span className="count-pill">{ordered.length}</span>}
          </button>
        </div>
      </div>
    </main>
  );
}
