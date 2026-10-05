import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { freshStart, answerCurrent, progressText, EXERCISE_TYPES } from './helpers';

const exercises = JSON.parse(
  readFileSync(new URL('../public/data.json', import.meta.url), 'utf8')
).exercises;
const prepositions = exercises.prepositions;

async function useSingleItem(page, type, level, item) {
  await page.route('**/data.json', async (route) => {
    const response = await route.fetch();
    const data = await response.json();
    data.exercises[type].items[level] = [item];
    await route.fulfill({ json: data });
  });
}

const localizationCases = [
  { type: 'confusedWords', level: 'B1', item: exercises.confusedWords.items.B1.find((item) => item.question === 'Guinea pig') },
  { type: 'chooseWord', level: 'A2', item: exercises.chooseWord.items.A2.find((item) => item.question === 'I want to eat.') },
  { type: 'chooseWord', level: 'A1', item: exercises.chooseWord.items.A1.find((item) => item.question === 'jablko') },
  { type: 'chooseWord', level: 'B1', item: exercises.chooseWord.items.B1.find((item) => item.question === "Which case does 'bez' require?") },
];

for (const lang of ['en', 'cs', 'pl', 'uk', 'ru']) {
  for (const { type, level, item } of localizationCases) {
    test(`localization: ${item.question} (${lang})`, async ({ page }) => {
      await useSingleItem(page, type, level, item);
      await freshStart(page, { settings: { lang }, hash: `#/ex/${type}/${level}` });
      const learnerLang = lang === 'cs' ? 'en' : lang;
      const question = item.prompt ? item.prompt[learnerLang]
        : item.questionTranslations && lang !== 'en' ? item.questionTranslations[lang] : item.question;
      const questionLang = item.prompt ? learnerLang : item.questionTranslations ? lang : 'cs';
      await expect(page.locator(`.question-text > span[lang="${questionLang}"]`)).toHaveText(question);
      const choices = item.optionsTranslations?.[lang] || item.options;
      const choiceLang = item.optionsTranslations ? item.optionsTranslations[lang] ? lang : 'en' : 'cs';
      const labels = page.locator('.option-label');
      expect((await labels.allTextContents()).sort()).toEqual([...choices].sort());
      for (const label of await labels.all()) await expect(label).toHaveAttribute('lang', choiceLang);
      await page.locator('.option-btn').filter({ hasText: choices[item.correct] }).click();
      await expect(page.locator('.progress-segment.correct')).toHaveCount(1);
      await expect(page.locator('.option-btn.correct .option-label')).toHaveText(choices[item.correct]);
      if (item.explanation && lang !== 'en') {
        await expect(page.locator('.explanation')).toHaveAttribute('lang', lang);
        await expect(page.locator('.explanation')).not.toHaveText(item.explanation);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    });
  }

  test(`localization: missing-letter vocabulary hint (${lang})`, async ({ page }) => {
    const item = exercises.chooseLetter.items.C1.find((item) => item.hint === 'exploitable');
    await useSingleItem(page, 'chooseLetter', 'C1', item);
    await freshStart(page, { settings: { lang }, hash: '#/ex/chooseLetter/C1' });
    const learnerLang = lang === 'cs' ? 'en' : lang;
    await expect(page.locator('.hint-text').first()).toHaveText(learnerLang === 'en' ? item.hint : item.hintTranslations[learnerLang]);
    await expect(page.locator('.hint-text').first()).toHaveAttribute('lang', learnerLang);
    await expect(page.locator('.word-display')).toHaveAttribute('lang', 'cs');
    await page.locator('.letter-input').fill(item.missing);
    await expect(page.locator('.progress-segment.correct')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}

for (const correct of [true, false]) {
  test(`localization: switching languages preserves choice order and ${correct ? 'correct' : 'wrong'} feedback`, async ({ page }) => {
    const item = exercises.chooseWord.items.A1.find((item) => item.question === 'jablko');
    await useSingleItem(page, 'chooseWord', 'A1', item);
    await freshStart(page, { settings: { lang: 'pl' }, hash: '#/ex/chooseWord/A1' });
    const labels = page.locator('.option-label');
    await expect(labels).toHaveCount(item.options.length);
    const order = (await labels.allTextContents()).map((label) => item.optionsTranslations.pl.indexOf(label));
    await page.locator('.lang-picker select').selectOption('uk');
    await expect(labels).toHaveText(order.map((index) => item.optionsTranslations.uk[index]));
    const picked = correct ? item.correct : (item.correct + 1) % item.options.length;
    await page.locator('.option-btn').nth(order.indexOf(picked)).click();
    await expect(page.locator(`.progress-segment.${correct ? 'correct' : 'wrong'}`)).toHaveCount(1);
    await page.locator('.lang-picker select').selectOption('ru');
    await expect(labels).toHaveText(order.map((index) => item.optionsTranslations.ru[index]));
    await expect(page.locator('.option-btn.correct .option-label')).toHaveText(item.optionsTranslations.ru[item.correct]);
    if (!correct) {
      await expect(page.locator('.option-btn.wrong .option-label')).toHaveText(item.optionsTranslations.ru[picked]);
    }
    await page.locator('.lang-picker select').selectOption('cs');
    await expect(labels).toHaveText(order.map((index) => item.options[index]));
    for (const label of await labels.all()) await expect(label).toHaveAttribute('lang', 'en');
  });
}

for (const [lang, expectedHint] of Object.entries({
  en: 'his', cs: 'jeho', pl: 'jego', uk: 'його', ru: 'его',
})) {
  test(`question hints are localized and visible above the gap (${lang})`, async ({ page }) => {
    const item = {
      question: 'To je ___ kniha. (his)',
      options: ['jeho', 'její', 'jejich', 'svůj'],
      correct: 0,
    };
    await page.route('**/data.json', async (route) => {
      const response = await route.fetch();
      const data = await response.json();
      data.exercises.possessives.items.A1 = [item];
      await route.fulfill({ json: data });
    });
    await freshStart(page, { settings: { lang }, hash: '#/ex/possessives/A1' });
    const hint = page.locator('.question-hint');
    const gap = page.locator('.question-hint-target');
    await expect(hint).toBeVisible();
    await expect(hint).toHaveText(expectedHint);
    await expect(hint).toHaveAttribute('lang', lang);
    await expect(page.locator('.question-text')).toContainText('To je');
    await expect(page.locator('.question-text')).toContainText('kniha.');
    await expect(gap).toHaveText('___');
    await expect(page.locator('.question-text button')).toHaveCount(0);
    const hintBox = await hint.boundingBox();
    const gapBox = await gap.boundingBox();
    expect(hintBox.y + hintBox.height).toBeLessThanOrEqual(gapBox.y);
    expect(Math.abs(hintBox.x + hintBox.width / 2 - gapBox.x - gapBox.width / 2)).toBeLessThan(1);
    await expect(hint).toHaveCSS('font-style', 'italic');
    await expect(hint).toHaveCSS('border-top-style', 'solid');
    await expect(hint).toHaveCSS('border-top-width', '1px');
    const pointer = await hint.evaluate((element) => {
      const style = getComputedStyle(element, '::after');
      return {
        content: style.content,
        position: style.position,
        border: style.borderBottomStyle,
        transform: style.transform,
      };
    });
    expect(pointer.content).toBe('""');
    expect(pointer.position).toBe('absolute');
    expect(pointer.border).toBe('solid');
    expect(pointer.transform).not.toBe('none');
    await page.locator('.option-btn').filter({ hasText: 'jeho' }).click();
    await expect(page.locator('.progress-segment.correct')).toHaveCount(1);
  });
}

test('localized prompt hints are preserved when the language changes', async ({ page }) => {
  await page.route('**/data.json', async (route) => {
    const response = await route.fetch();
    const data = await response.json();
    data.exercises.confusedWords.items.A1 = [{
      question: 'to be (existence)',
      prompt: {
        en: 'to be (existence)', pl: 'być (istnienie)',
        uk: 'бути (існування)', ru: 'быть (существование)',
      },
      options: ['být', 'byt'],
      correct: 0,
    }];
    await route.fulfill({ json: data });
  });
  await freshStart(page, { settings: { lang: 'pl' }, hash: '#/ex/confusedWords/A1' });
  const hint = page.locator('.question-hint');
  await expect(hint).toHaveText('istnienie');
  await expect(hint).toHaveAttribute('lang', 'pl');
  await expect(page.locator('.question-hint-target')).toHaveText('być');
  await page.locator('.lang-picker select').selectOption('cs');
  await expect(hint).toHaveText('existence');
  await expect(hint).toHaveAttribute('lang', 'cs');
  await expect(page.locator('.question-hint-target')).toHaveText('be');
  await page.locator('.lang-picker select').selectOption('uk');
  await expect(hint).toHaveText('існування');
  await expect(hint).toHaveAttribute('lang', 'uk');
});

for (const lang of ['en', 'pl', 'uk', 'ru', 'cs']) {
  test(`prepositions: localized prompts and Czech choices in ${lang}`, async ({ page }) => {
    await freshStart(page, { settings: { lang }, hash: '#/ex/prepositions/A1' });
    const promptLang = lang === 'cs' ? 'en' : lang;
    for (const level of ['A1', 'A2', 'B1', 'B2', 'C1']) {
      if (level !== 'A1') {
        await page.getByRole('button', { name: level, exact: true }).click();
      }
      const prompt = page.locator(`.question-text > span[lang="${promptLang}"]`);
      await expect(prompt).toBeVisible();
      const text = await prompt.textContent();
      const item = prepositions.items[level].find((it) => it.prompt[promptLang] === text);
      expect(item, `${level} prompt should use ${promptLang}`).toBeTruthy();
      const labels = page.locator('.option-label');
      expect((await labels.allTextContents()).sort()).toEqual([...item.options].sort());
      for (const label of await labels.all()) await expect(label).toHaveAttribute('lang', 'cs');
      await page.locator('.option-btn').filter({ hasText: item.options[item.correct] }).click();
      await expect(page.locator('.progress-segment.correct')).toHaveCount(1);
    }
  });
}

for (const type of EXERCISE_TYPES) {
  test(`${type}: renders and records an answer`, async ({ page }) => {
    await freshStart(page, { hash: `#/ex/${type}/A1` });
    await expect(progressText(page)).toContainText('1 / 12');
    await answerCurrent(page);
    await expect(page.locator('.progress-segment')).toHaveCount(1);
    await expect(progressText(page)).toContainText('2 / 12');
  });
}

for (const lang of ['cs', 'en', 'pl', 'uk', 'ru']) {
  test(`flashcards: uses the selected vocabulary language (${lang})`, async ({ page }) => {
    await freshStart(page, { settings: { lang }, hash: '#/ex/flashcards/A2' });
    await expect(page.locator('.flashcard')).toBeVisible();
    const faceLanguages = await page.locator('.flashcard-face').evaluateAll((faces) =>
      faces.map((face) => face.getAttribute('lang')).sort()
    );
    expect(faceLanguages).toEqual([lang, 'cs'].sort());
    for (const face of await page.locator('.flashcard-face').all()) {
      await expect(face).not.toBeEmpty();
    }
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
