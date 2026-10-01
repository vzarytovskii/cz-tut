import { test, expect } from '@playwright/test';
import { freshStart, EXERCISE_TYPES } from './helpers';

test.beforeEach(async ({ page }) => {
  await freshStart(page);
});

test('lists every exercise type', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Čeština');
  await expect(page.locator('.exercise-card.selectable')).toHaveCount(EXERCISE_TYPES.length);
});

test('start selected is enabled only after picking exercises', async ({ page }) => {
  const startSelected = page.getByRole('button', { name: /Start selected/ });
  await expect(startSelected).toBeDisabled();

  await page.locator('.exercise-card.selectable').nth(1).click();
  await expect(startSelected).toBeEnabled();
  await expect(startSelected.locator('.count-pill')).toHaveText('1');

  await page.locator('.home-selection .link-btn').click();
  await expect(startSelected).toBeDisabled();
});

test('selection persists across reloads', async ({ page }) => {
  await page.locator('.exercise-card.selectable').first().click();
  await page.locator('.exercise-card.selectable').nth(2).click();
  await page.reload();
  await expect(page.locator('.exercise-card.is-selected')).toHaveCount(2);
});

test('starting a single exercise routes to it', async ({ page }) => {
  await page.locator('.exercise-card.selectable').nth(1).click();
  await page.getByRole('button', { name: /Start selected/ }).click();
  await expect(page).toHaveURL(/#\/ex\/chooseWord$/);
  await expect(page.locator('.exercise-progress')).toContainText('1 / 12');
});

test('starting several exercises builds a combined route', async ({ page }) => {
  await page.locator('.exercise-card.selectable').nth(2).click();
  await page.locator('.exercise-card.selectable').nth(1).click();
  await page.getByRole('button', { name: /Start selected/ }).click();
  // Order follows data order, not click order.
  await expect(page).toHaveURL(/#\/ex\/chooseWord\+chooseLetter$/);
});

test('start all opens the mixed session', async ({ page }) => {
  await page.getByRole('button', { name: /Start all/ }).click();
  await expect(page).toHaveURL(/#\/ex\/mixed$/);
  await expect(page.getByRole('heading', { level: 1 })).not.toHaveText('Čeština');
});
