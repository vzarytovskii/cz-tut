import { useState, useEffect } from 'react';
import { SettingsProvider, useT } from './SettingsContext';
import { useRouter } from './router';
import LanguagePicker from './components/LanguagePicker';
import Home from './views/Home';
import Exercise from './views/Exercise';
import Settings from './views/Settings';

function AppContent() {
  const t = useT();
  const [data, setData] = useState(null);
  const { route, navigate, back } = useRouter();

  useEffect(() => {
    fetch('./data.json')
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const validType = (type) =>
    type === 'mixed' || (Boolean(type) && type.split('+').every((k) => data?.exercises?.[k]));
  const validLevel = (level) => (data?.levels?.includes(level) ? level : 'auto');

  // Unknown exercise in the URL (e.g. stale bookmark) falls back to home.
  useEffect(() => {
    if (data && route.view === 'exercise' && !validType(route.type)) {
      navigate({ view: 'home' }, { replace: true });
    }
  });

  const view = route.view === 'exercise' && data && !validType(route.type) ? 'home' : route.view;
  const exercise = view === 'exercise' ? { type: route.type, level: validLevel(route.level) } : null;

  const title =
    view === 'settings' ? t('settings') :
    view === 'exercise' && exercise?.type === 'mixed' ? t('mixLabel') :
    view === 'exercise' && exercise?.type.includes('+') ? t('mixSelectedLabel', { n: exercise.type.split('+').length }) :
    view === 'exercise' && data ? t.exercise(exercise?.type, data.exercises[exercise?.type]).label || t('exercise') :
    t('appTitle');

  // types: list of exercise keys; all of them → 'mixed', several → 'a+b'.
  const startExercise = (types) => {
    const all = Object.keys(data.exercises);
    const type = types.length === 1 ? types[0]
      : all.every((k) => types.includes(k) || !Object.values(data.exercises[k].items).some((l) => l.length)) ? 'mixed'
      : types.join('+');
    navigate({ view: 'exercise', type, level: 'auto' });
  };
  const setLevel = (level) => navigate({ view: 'exercise', type: exercise.type, level }, { replace: true });
  const toggleSettings = () => (view === 'settings' ? back() : navigate({ view: 'settings' }));

  return (
    <>
      <header>
        {view !== 'home' ? (
          <button className="icon-btn" onClick={back} aria-label={t('back')}>
            <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          </button>
        ) : (
          <span />
        )}
        <h1>{title}</h1>
        <div className="header-actions">
          <LanguagePicker />
          <button
            className="icon-btn"
            onClick={toggleSettings}
            aria-label={t('settings')}
            aria-pressed={view === 'settings'}
          >
            <i className="fa-solid fa-gear" aria-hidden="true" />
          </button>
        </div>
      </header>

      {view === 'home' && data && (
        <Home data={data} onStart={startExercise} />
      )}
      {view === 'exercise' && data && exercise && (
        <Exercise
          key={`${exercise.type}/${exercise.level}`}
          data={data}
          type={exercise.type}
          level={exercise.level}
          onLevelChange={setLevel}
          onDone={back}
        />
      )}
      {view === 'settings' && <Settings />}

      {!data && view === 'home' && (
        <p style={{ color: 'var(--error)', padding: '2rem', textAlign: 'center' }}>
          {t('loading')}
        </p>
      )}
    </>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}
