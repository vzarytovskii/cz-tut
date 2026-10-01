import { test, expect } from '@playwright/test';
import { freshStart } from './helpers';

const bg = (page) =>
  page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--bg').trim());

test('theme switch applies system, light and dark', async ({ page }) => {
  await freshStart(page);
  const html = page.locator('html');
  const theme = page.getByRole('group', { name: 'Theme' });
  const [system, light, dark] = await theme.getByRole('button').all();
  await expect(system).toHaveAttribute('aria-pressed', 'true');
  await expect(html).not.toHaveAttribute('data-theme');

  await dark.click();
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(html).toHaveAttribute('data-theme', 'dark');

  await light.click();
  await expect(html).toHaveAttribute('data-theme', 'light');

  await system.click();
  await expect(html).not.toHaveAttribute('data-theme');
  await expect(system).toHaveAttribute('aria-pressed', 'true');
});

test('system theme follows the OS color scheme', async ({ page }) => {
  await freshStart(page);
  await page.emulateMedia({ colorScheme: 'light' });
  const light = await bg(page);
  await page.emulateMedia({ colorScheme: 'dark' });
  const dark = await bg(page);
  expect(dark).not.toBe(light);

  // An explicit Light choice must override a dark OS.
  await page.getByRole('group', { name: 'Theme' }).getByRole('button').nth(1).click();
  expect(await bg(page)).toBe(light);
});

test('text size switch sets data-size', async ({ page }) => {
  await freshStart(page);
  const html = page.locator('html');
  const sizes = page.getByRole('group', { name: 'Text size' }).getByRole('button');
  await sizes.nth(1).click();
  await expect(html).toHaveAttribute('data-size', 'large');
  await sizes.first().click();
  await expect(html).not.toHaveAttribute('data-size');
});

test('language picker translates the UI', async ({ page }) => {
  await freshStart(page);
  await page.getByRole('combobox', { name: 'Language' }).selectOption('cs');
  await expect(page.getByText('Vyberte cvičení')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'cs');
});

test.describe('browser language detection', () => {
  test.use({ locale: 'pl-PL' });
  test('picks a supported browser language on first visit', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
    await expect(page.getByText('Wybierz ćwiczenia')).toBeVisible();
  });
});

test('reset progress clears saved scores', async ({ page }) => {
  await freshStart(page, { hash: '#/settings' });
  await page.evaluate(() => localStorage.setItem('cz-scores', '{"chooseWord-A1":90}'));
  page.on('dialog', (d) => d.accept());
  await page.getByRole('button', { name: /Reset all progress/ }).click();
  await expect.poll(() => page.evaluate(() => localStorage.getItem('cz-scores'))).toBeNull();
});
