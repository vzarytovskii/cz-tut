import { useState, useMemo, useCallback } from 'react';
import QuestionText from '../components/QuestionText';
import OptionList from '../components/OptionList';

function shuffleOptions(item) {
  const indexed = item.options.map((opt, i) => ({ opt, isCorrect: i === item.correct }));
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }
  return {
    options: indexed.map((o) => o.opt),
    correctIdx: indexed.findIndex((o) => o.isCorrect),
  };
}

export default function ConfusedWords({ item, onAnswer }) {
  const [answered, setAnswered] = useState(false);
  const [chosen, setChosen] = useState(null);
  const { options, correctIdx } = useMemo(() => shuffleOptions(item), [item]);

  const handleClick = useCallback((idx) => {
    if (answered) return;
    setAnswered(true);
    setChosen(idx);
    onAnswer(idx === correctIdx);
  }, [answered, correctIdx, onAnswer]);

  return (
    <div className="question-container">
      <QuestionText question={item.question} prompt={item.prompt} questionTranslations={item.questionTranslations} />
      <OptionList
        options={options}
        onPick={handleClick}
        answered={answered}
        lang="cs"
        statusOf={(i) => (i === correctIdx ? 'correct' : i === chosen ? 'wrong' : null)}
      />
    </div>
  );
}
