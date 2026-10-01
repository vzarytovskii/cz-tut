import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { shuffle, saveScore } from '../utils';
import Flashcards from '../exercises/Flashcards';
import ChooseWord from '../exercises/ChooseWord';
import ChooseLetter from '../exercises/ChooseLetter';
import Accents from '../exercises/Accents';
import ConfusedWords from '../exercises/ConfusedWords';
import Results from '../components/Results';
import { useSettings, useT } from '../SettingsContext';
import { localizeExplanation } from '../explanationTranslations';

const COMPONENTS = {
  flashcards: Flashcards,
  chooseWord: ChooseWord,
  chooseLetter: ChooseLetter,
  accents: Accents,
  confusedWords: ConfusedWords,
  possessives: ChooseWord,
};

const EASY_LEVELS = ['A1', 'A2'];
const HARD_LEVELS = ['B1', 'B2', 'C1'];
const WINDOW_SIZE = 6;
const PROMOTE_THRESHOLD = 0.8;
const BATCH_SIZE = 12;
const ANSWER_DELAY = 10;

function randomDirection() {
  return Math.random() < 0.5 ? 'en-cz' : 'cz-en';
}

function buildAdaptivePool(exerciseData, exerciseType) {
  const easy = [];
  const hard = [];

  for (const level of EASY_LEVELS) {
    const items = exerciseData.items[level];
    if (items) easy.push(...items.map((item) => ({ ...item, exerciseType, level, direction: randomDirection() })));
  }
  for (const level of HARD_LEVELS) {
    const items = exerciseData.items[level];
    if (items) hard.push(...items.map((item) => ({ ...item, exerciseType, level, direction: randomDirection() })));
  }

  return { easy, hard };
}

// type is 'mixed' (everything), one exercise key, or several joined with '+'.
function sourcesFor(data, type) {
  if (type === 'mixed') return Object.entries(data.exercises);
  return type.split('+').filter((k) => data.exercises[k]).map((k) => [k, data.exercises[k]]);
}

// level === 'auto' → start easy and promote; otherwise only that level.
function buildPool(data, type, level) {
  const sources = sourcesFor(data, type);
  if (level !== 'auto') {
    const items = [];
    for (const [exType, exData] of sources) {
      const list = exData.items[level] || [];
      items.push(...list.map((item) => ({ ...item, exerciseType: exType, level, direction: randomDirection() })));
    }
    return { easy: shuffle(items), hard: [] };
  }
  const easy = [];
  const hard = [];
  for (const [exType, exData] of sources) {
    const pool = buildAdaptivePool(exData, exType);
    easy.push(...pool.easy);
    hard.push(...pool.hard);
  }
  return { easy: shuffle(easy), hard: shuffle(hard) };
}

function availableLevels(data, type) {
  const sources = sourcesFor(data, type).map(([, ex]) => ex);
  return (data.levels || []).filter((lvl) => sources.some((ex) => ex.items[lvl]?.length));
}

// Rounds have a fixed length; promotion swaps upcoming easy items for hard ones
// instead of growing the round.
function pickNext(pool, cursor, hist) {
  const promoted = hist.length >= WINDOW_SIZE
    && hist.filter(Boolean).length / hist.length >= PROMOTE_THRESHOLD;
  const easyLeft = cursor.easy < pool.easy.length;
  const hardLeft = cursor.hard < pool.hard.length;
  if (hardLeft && (promoted || !easyLeft)) {
    return { item: pool.hard[cursor.hard], cursor: { ...cursor, hard: cursor.hard + 1 } };
  }
  if (easyLeft) return { item: pool.easy[cursor.easy], cursor: { ...cursor, easy: cursor.easy + 1 } };
  return null;
}

const remainingIn = (pool, c) => pool.easy.length - c.easy + pool.hard.length - c.hard;

function startSession(pool) {
  const empty = { easy: 0, hard: 0 };
  const first = pickNext(pool, empty, []);
  return {
    pool,
    served: first ? [first.item] : [],
    cursor: first ? first.cursor : empty,
    target: Math.min(BATCH_SIZE, remainingIn(pool, empty)),
  };
}

function LevelPicker({ levels, value, onChange }) {
  const t = useT();
  const options = ['auto', ...levels];
  return (
    <div className="level-picker" role="group" aria-label={t('level')}>
      <span className="level-picker-label" aria-hidden="true">{t('level')}</span>
      <div className="level-picker-options">
        {options.map((lvl) => (
          <button
            key={lvl}
            type="button"
            className="level-btn"
            aria-pressed={value === lvl}
            title={lvl === 'auto' ? t('levelAutoDesc') : undefined}
            onClick={() => value !== lvl && onChange(lvl)}
          >
            {lvl === 'auto' ? (
              <><i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true" /><span className="level-btn-text">{t('levelAuto')}</span></>
            ) : <span className="level-btn-text">{lvl}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Exercise({ data, type, level = 'auto', onLevelChange, onDone }) {
  const t = useT();
  const { settings } = useSettings();
  const autoAdvance = settings.autoAdvance !== false;
  const levels = useMemo(() => availableLevels(data, type), [data, type]);
  const [session, setSession] = useState(() => startSession(buildPool(data, type, level)));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [results, setResults] = useState([]);  // full answer history for progress bar
  const [answered, setAnswered] = useState(false);
  const [remaining, setRemaining] = useState(ANSWER_DELAY);
  const advanced = useRef(false);
  const nextRef = useRef(null);
  const total = session.target;

  const record = useCallback((correct) => {
    const newHistory = [...history, correct].slice(-WINDOW_SIZE);
    setHistory(newHistory);
    setResults((r) => [...r, correct]);
    if (correct) setScore((s) => s + 1);
    return newHistory;
  }, [history]);

  // Queue the next item (chosen with the latest answers) and move on.
  const advance = useCallback((hist) => {
    setSession((s) => {
      if (s.served.length >= s.target) return s;
      const next = pickNext(s.pool, s.cursor, hist);
      return next
        ? { ...s, served: [...s.served, next.item], cursor: next.cursor }
        : { ...s, target: s.served.length };
    });
    setIndex((i) => i + 1);
  }, []);

  const handleAnswer = useCallback((correct) => {
    record(correct);
    advanced.current = false;
    setRemaining(ANSWER_DELAY);
    setAnswered(true);
  }, [record]);

  const handleNext = useCallback(() => {
    if (advanced.current) return;
    advanced.current = true;
    setAnswered(false);
    advance(history);
  }, [advance, history]);

  useEffect(() => {
    if (!answered || !autoAdvance) return;
    const deadline = Date.now() + ANSWER_DELAY * 1000;
    const interval = setInterval(() => {
      setRemaining(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    }, 250);
    const timeout = setTimeout(handleNext, ANSWER_DELAY * 1000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [answered, index, handleNext, autoAdvance]);

  // Move focus to Next so keyboard/clicker users can continue with Enter.
  useEffect(() => {
    if (answered) nextRef.current?.focus({ preventScroll: false });
  }, [answered]);

  const handleFlashcardNext = useCallback((known) => {
    advance(record(known));
  }, [advance, record]);

  const scoreSaved = useRef(false);
  useEffect(() => {
    if (index >= total && total > 0 && !scoreSaved.current) {
      scoreSaved.current = true;
      saveScore(type, level === 'auto' ? 'adaptive' : level, Math.round((score / total) * 100));
    }
  }, [index, total, score, type, level]);

  const picker = onLevelChange && (
    <LevelPicker levels={levels} value={level} onChange={onLevelChange} />
  );

  if (index >= total) {
    if (total === 0) return <main>{picker}</main>;
    const left = remainingIn(session.pool, session.cursor);
    const moreCount = Math.min(BATCH_SIZE, left);
    return (
      <main>
      {picker}
      <Results
        score={score}
        total={total}
        onHome={onDone}
        moreCount={moreCount}
        onMore={moreCount > 0 ? () => {
          scoreSaved.current = false;
          setSession((s) => {
            const next = pickNext(s.pool, s.cursor, history);
            if (!next) return s;
            return {
              ...s,
              served: [...s.served, next.item],
              cursor: next.cursor,
              target: s.target + Math.min(BATCH_SIZE, remainingIn(s.pool, s.cursor)),
            };
          });
        } : undefined}
        onRetry={() => {
          scoreSaved.current = false;
          setSession(startSession(buildPool(data, type, level)));
          setIndex(0);
          setScore(0);
          setHistory([]);
          setResults([]);
          setRemaining(ANSWER_DELAY);
        }}
      />
      </main>
    );
  }

  const item = session.served[index];
  const explanation = localizeExplanation(item.explanation, settings.lang);
  const Component = COMPONENTS[item.exerciseType];

  return (
    <main>
      {picker}
      <div className="exercise-progress" id="exercise-progress">
        {index + 1} / {total}
        {level === 'auto' && <span className="level-badge" aria-label={`${t('level')} ${item.level}`}>{item.level}</span>}
      </div>
      <div
        className="progress-bar"
        role="progressbar"
        aria-labelledby="exercise-progress"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={results.length}
      >
        {results.map((correct, i) => (
          <div
            key={i}
            className={`progress-segment ${correct ? 'correct' : 'wrong'}`}
            style={{ width: `${100 / total}%` }}
          />
        ))}
      </div>
      <Component
        key={index}
        item={item}
        direction={item.direction}
        onAnswer={handleAnswer}
        onNext={handleFlashcardNext}
      />
      <div className="sr-only" role="status" aria-live="polite">
        {answered ? t(results[results.length - 1] ? 'feedbackCorrect' : 'feedbackWrong') : ''}
      </div>
      {item.exerciseType !== 'flashcards' && (
        // Space is reserved up front so answering never shifts the layout.
        <div className="exercise-next-row">
          {answered && (
            <button ref={nextRef} className="btn btn-primary exercise-next" onClick={handleNext}>
              {autoAdvance ? t('next', { n: remaining }) : t('nextPlain')}
            </button>
          )}
        </div>
      )}
      {answered && explanation && (
        <div className="explanation" role="note" lang={settings.lang}>{explanation}</div>
      )}
    </main>
  );
}
