import { expect } from '@playwright/test';

export const EXERCISE_TYPES = ['flashcards', 'chooseWord', 'chooseLetter', 'accents', 'confusedWords', 'possessives'];

// Start every test from a clean profile with English UI and no auto-advance timer.
export async function freshStart(page, { settings = {}, hash = '#/' } = {}) {
  await page.addInitScript((s) => {
    if (sessionStorage.getItem('__seeded')) return;
    sessionStorage.setItem('__seeded', '1');
    localStorage.clear();
    localStorage.setItem('cz-settings', JSON.stringify(s));
  }, { lang: 'en', autoAdvance: false, ...settings });
  await page.goto(`./${hash}`);
}

export const progressText = (page) => page.locator('.exercise-progress');

// Answers whatever question is on screen; returns the graded result.
export async function answerCurrent(page, { known = true } = {}) {
  await expect(page.locator('.flashcard, .accent-word, .option-btn').first()).toBeVisible();
  if (await page.locator('.flashcard').isVisible()) {
    await page.getByRole('button', { name: known ? 'Got it' : 'Skip' }).click();
    return known;
  }
  if (await page.locator('.accent-word').isVisible()) {
    await page.getByRole('button', { name: 'Check', exact: true }).click();
  } else {
    await page.locator('.option-btn').first().click();
  }
  const next = page.locator('.exercise-next');
  await expect(next).toBeVisible();
  const correct = (await page.locator('.progress-segment').last().getAttribute('class')).includes('correct');
  await next.click();
  return correct;
}
