import { test, expect } from '@playwright/test';
import { freshStart, answerCurrent, progressText, EXERCISE_TYPES } from './helpers';

for (const type of EXERCISE_TYPES) {
  test(`${type}: renders and records an answer`, async ({ page }) => {
    await freshStart(page, { hash: `#/ex/${type}/A1` });
    await expect(progressText(page)).toContainText('1 / 12');
    await answerCurrent(page);
    await expect(page.locator('.progress-segment')).toHaveCount(1);
    await expect(progressText(page)).toContainText('2 / 12');
  });
}

test('multiple-choice feedback marks the right and wrong options', async ({ page }) => {
  await freshStart(page, { hash: '#/ex/chooseWord/A1' });
  const options = page.locator('.option-btn');
  await options.first().click();

  await expect(page.locator('.option-btn.correct')).toHaveCount(1);
  const pickedCorrect = (await options.first().getAttribute('class')).includes('correct');
  await expect(page.locator('.option-btn.wrong')).toHaveCount(pickedCorrect ? 0 : 1);
  await expect(page.locator('.progress-segment')).toHaveClass(new RegExp(pickedCorrect ? 'correct' : 'wrong'));
  for (const btn of await options.all()) await expect(btn).toBeDisabled();
});

test('number keys pick options', async ({ page }) => {
  await freshStart(page, { hash: '#/ex/confusedWords/A1' });
  await expect(page.locator('.option-btn').first()).toBeVisible();
  await page.keyboard.press('2');
  await expect(page.locator('.exercise-next')).toBeVisible();
  await expect(page.locator('.option-btn.correct')).toHaveCount(1);
});

test('chooseLetter grades typed input', async ({ page }) => {
  await freshStart(page, { hash: '#/ex/chooseLetter/A1' });
  await page.getByRole('textbox', { name: 'Missing letter' }).fill('q');
  await expect(page.locator('.progress-segment.wrong')).toHaveCount(1);
  await expect(page.locator('.letter-input.is-wrong')).toBeVisible();
});

test('a full round shows results and saves the best score', async ({ page }) => {
  await freshStart(page, { hash: '#/ex/chooseWord/A1' });
  let correct = 0;
  for (let i = 0; i < 12; i++) if (await answerCurrent(page)) correct++;

  const pct = Math.round((correct / 12) * 100);
  await expect(page.locator('.results .score')).toHaveText(`${pct}%`);
  await expect(page.locator('.results .label')).toContainText(`${correct}`);
  const scores = await page.evaluate(() => JSON.parse(localStorage.getItem('cz-scores')));
  expect(scores['chooseWord-A1']).toBe(pct);

  await page.getByRole('button', { name: 'Try again' }).click();
  await expect(progressText(page)).toContainText('1 / 12');
  await expect(page.locator('.progress-segment')).toHaveCount(0);
});

test('adaptive mode promotes to harder levels after a strong streak', async ({ page }) => {
  await freshStart(page, { hash: '#/ex/flashcards' });
  const badge = page.locator('.level-badge');
  for (let i = 0; i < 6; i++) {
    await expect(badge).toHaveText(/^A[12]$/);
    await answerCurrent(page, { known: true });
  }
  await expect(badge).toHaveText(/^(B1|B2|C1)$/);
});

test('adaptive mode stays easy after misses', async ({ page }) => {
  await freshStart(page, { hash: '#/ex/flashcards' });
  for (let i = 0; i < 8; i++) await answerCurrent(page, { known: false });
  await expect(page.locator('.level-badge')).toHaveText(/^A[12]$/);
});

test('level picker switches to a fixed level', async ({ page }) => {
  await freshStart(page, { hash: '#/ex/chooseWord' });
  const a2 = page.getByRole('button', { name: 'A2', exact: true });
  await a2.click();
  await expect(page).toHaveURL(/#\/ex\/chooseWord\/A2$/);
  await expect(a2).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.level-badge')).toHaveCount(0);
});

test('auto-advance moves on without pressing Next', async ({ page }) => {
  await page.clock.install();
  await freshStart(page, { hash: '#/ex/chooseWord/A1', settings: { autoAdvance: true } });
  await page.locator('.option-btn').first().click();
  await expect(page.locator('.exercise-next')).toContainText('10');
  await page.clock.runFor(10_500);
  await expect(progressText(page)).toContainText('2 / 12');
});
