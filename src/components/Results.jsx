import { useT } from '../SettingsContext';

export default function Results({ score, total, onHome, onRetry, onMore, moreCount = 0 }) {
  const t = useT();
  const pct = Math.round((score / total) * 100);
  const message =
    pct >= 80 ? t('greatJob') :
    pct >= 50 ? t('keepPracticing') :
    t('dontGiveUp');

  return (
    <section className="results">
      <div className="score">{pct}%</div>
      <div className="label">{t('scoreCorrect', { score, total })}</div>
      <p className="message">{message}</p>
      <div className="results-actions">
        <button className="btn btn-secondary" onClick={onHome}>{t('home')}</button>
        <button className={`btn ${onMore ? 'btn-secondary' : 'btn-primary'}`} onClick={onRetry}>{t('tryAgain')}</button>
        {onMore && (
          <button className="btn btn-primary" onClick={onMore} autoFocus>
            <i className="fa-solid fa-plus" aria-hidden="true" /> {t('loadMore', { n: moreCount })}
          </button>
        )}
      </div>
    </section>
  );
}
