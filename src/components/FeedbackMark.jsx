import { useT } from '../SettingsContext';

export default function FeedbackMark({ correct }) {
  const t = useT();
  return (
    <>
      <i className={`fa-solid ${correct ? 'fa-circle-check is-correct' : 'fa-circle-xmark is-wrong'} feedback-mark`} aria-hidden="true" />
      <span className="sr-only">{t(correct ? 'feedbackCorrect' : 'feedbackWrong')}</span>
    </>
  );
}
