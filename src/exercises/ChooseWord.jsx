import { useState, useMemo, useCallback } from 'react';
import QuestionText from '../components/QuestionText';
import OptionList from '../components/OptionList';
import { useT } from '../SettingsContext';
import { localizeOptions } from '../exerciseContent';
import { shuffle } from '../utils';

export default function ChooseWord({ item, onAnswer }) {
  const t = useT();
  const [answered, setAnswered] = useState(false);
  const [chosen, setChosen] = useState(null);
  const order = useMemo(() => shuffle(item.options.map((_, i) => i)), [item]);
  const correctIdx = order.indexOf(item.correct);
  const { options, lang } = localizeOptions(item, t.lang);

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
        options={order.map((i) => options[i])}
        onPick={handleClick}
        answered={answered}
        lang={lang}
        statusOf={(i) => (i === correctIdx ? 'correct' : i === chosen ? 'wrong' : null)}
      />
    </div>
  );
}
