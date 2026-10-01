export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function saveScore(type, level, pct) {
  try {
    const scores = JSON.parse(localStorage.getItem('cz-scores') || '{}');
    const key = `${type}-${level}`;
    if (!scores[key] || pct > scores[key]) {
      scores[key] = pct;
      localStorage.setItem('cz-scores', JSON.stringify(scores));
    }
  } catch { /* noop */ }
}

export function resetProgress() {
  localStorage.removeItem('cz-scores');
}
