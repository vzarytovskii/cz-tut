import { test, expect } from '@playwright/test';
import { freshStart } from './helpers';

test('settings deep link and header toggle', async ({ page }) => {
  await freshStart(page, { hash: '#/settings' });
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Settings');
  await page.getByRole('button', { name: 'Settings' }).click();
  await expect(page).toHaveURL(/#\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Čeština');
});

test('unknown exercise falls back to home', async ({ page }) => {
  await freshStart(page, { hash: '#/ex/doesNotExist' });
  await expect(page).toHaveURL(/#\/$/);
  await expect(page.locator('.exercise-card.selectable').first()).toBeVisible();
});

test('unknown level falls back to adaptive', async ({ page }) => {
  await freshStart(page, { hash: '#/ex/chooseWord/Z9' });
  await expect(page.locator('.level-btn').first()).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.level-badge')).toBeVisible();
});

test('header back and browser back agree', async ({ page }) => {
  await freshStart(page);
  await page.getByRole('button', { name: /Start all/ }).click();
  await expect(page).toHaveURL(/#\/ex\/mixed$/);
  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page).toHaveURL(/#\/$/);

  await page.getByRole('button', { name: 'Settings' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Settings');
  await page.goBack();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Čeština');
});

test('PWA assets are served with relative paths', async ({ request }) => {
  for (const path of ['manifest.json', 'sw.js', 'data.json', 'icons/icon-192.svg']) {
    const res = await request.get(path);
    expect(res.ok(), path).toBeTruthy();
  }
  const manifest = await (await request.get('manifest.json')).json();
  expect(manifest.start_url.startsWith('/')).toBeFalsy();
  const html = await (await request.get('./')).text();
  expect(html).not.toMatch(/(src|href)="\/(?!\/)/);
});
