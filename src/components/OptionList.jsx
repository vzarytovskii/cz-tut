import { useEffect } from 'react';
import FeedbackMark from './FeedbackMark';

// statusOf(i) returns 'correct' | 'wrong' | null once answered.
export default function OptionList({ options, onPick, answered, statusOf, compact, lang }) {
  useEffect(() => {
    if (answered) return;
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target.closest?.('input, textarea, select, [contenteditable="true"]')) return;
      const n = Number(e.key);
      if (Number.isInteger(n) && n >= 1 && n <= options.length) {
        e.preventDefault();
        onPick(n - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [answered, options.length, onPick]);

  return (
    <div className={`options${compact ? ' compact' : ''}`}>
      {options.map((opt, i) => {
        const status = answered ? statusOf(i) : null;
        return (
          <button
            key={i}
            className={`option-btn${status ? ` ${status}` : ''}`}
            disabled={answered}
            onClick={() => onPick(i)}
          >
            {!compact && <span className="option-key" aria-hidden="true">{i + 1}</span>}
            <span className="option-label" lang={lang}>{opt}</span>
            {status && <FeedbackMark correct={status === 'correct'} />}
          </button>
        );
      })}
    </div>
  );
}
