import { useState } from 'react';
import { useT } from '../SettingsContext';

export default function Flashcards({ item, direction, onNext }) {
  const t = useT();
  const [flipped, setFlipped] = useState(false);

  const front = direction === 'en-cz' ? item.front : item.back;
  const back = direction === 'en-cz' ? item.back : item.front;
  const frontLang = direction === 'en-cz' ? 'en' : 'cs';
  const backLang = direction === 'en-cz' ? 'cs' : 'en';

  return (
    <div className="flashcard-container">
      <button
        type="button"
        className={`flashcard${flipped ? ' flipped' : ''}`}
        aria-pressed={flipped}
        aria-describedby="flashcard-hint"
        onClick={() => setFlipped((f) => !f)}
      >
        <span className="flashcard-inner">
          <span className="flashcard-face" lang={frontLang} aria-hidden={flipped}>{front}</span>
          <span className="flashcard-face flashcard-back" lang={backLang} aria-hidden={!flipped}>{back}</span>
        </span>
      </button>
      <p className="flashcard-hint" id="flashcard-hint">{t('tapToFlip')}</p>
      <div className="flashcard-nav">
        <button className="btn btn-secondary" onClick={() => { setFlipped(false); onNext(false); }}>
          {t('skip')}
        </button>
        <button className="btn btn-primary" onClick={() => { setFlipped(false); onNext(true); }}>
          {t('gotIt')} <i className="fa-solid fa-check" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
