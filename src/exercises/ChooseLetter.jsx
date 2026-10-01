import { useState, useRef, useEffect, useCallback } from 'react';
import { useT } from '../SettingsContext';
import OptionList from '../components/OptionList';
import FeedbackMark from '../components/FeedbackMark';

export default function ChooseLetter({ item, onAnswer }) {
  const t = useT();
  const [answered, setAnswered] = useState(false);
  const [typed, setTyped] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const isCorrectAnswer = (value) =>
    value.toLowerCase() === item.missing.toLowerCase();

  const handleSubmit = (value) => {
    if (answered) return;
    setAnswered(true);
    onAnswer(isCorrectAnswer(value));
  };

  const handleInput = (e) => {
    const val = e.target.value;
    setTyped(val);
    if (val.length > 0) {
      handleSubmit(val.trim());
    }
  };

  const handleOption = useCallback((idx) => {
    if (answered) return;
    setSelectedIdx(idx);
    setTyped(item.options[idx]);
    setAnswered(true);
    onAnswer(item.options[idx] === item.missing);
  }, [answered, item, onAnswer]);

  const wordParts = item.word.split('_');
  const isCorrect = answered && isCorrectAnswer(typed);
  const usedButton = selectedIdx !== null;
  const resultCls = answered ? (isCorrect ? ' is-correct' : ' is-wrong') : '';

  return (
    <div className="question-container">
      <p className="hint-text">{item.hint}</p>
      <div className={`word-display${resultCls}`} lang="cs">
        <span className="mark-anchor">
          {wordParts[0]}<span className="blank">{answered ? item.missing : '_'}</span>{wordParts[1] || ''}
          {answered && <FeedbackMark correct={isCorrect} />}
        </span>
      </div>
      <input
        ref={inputRef}
        type="text"
        lang="cs"
        className={`letter-input${answered && !usedButton ? resultCls : ''}`}
        maxLength={2}
        autoComplete="off"
        autoCapitalize="off"
        aria-label={t('missingLetter')}
        placeholder={t('typePlaceholder')}
        value={typed}
        onChange={handleInput}
        disabled={answered}
      />
      <p className="hint-text" style={{ margin: '0.25rem 0 0.75rem' }}>{t('orTapBelow')}</p>
      <OptionList
        compact
        lang="cs"
        options={item.options}
        onPick={handleOption}
        answered={answered}
        statusOf={(i) => (item.options[i] === item.missing ? 'correct' : i === selectedIdx ? 'wrong' : null)}
      />
    </div>
  );
}
