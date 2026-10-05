import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

// Content checks run in Node, no browser needed.
const data = JSON.parse(readFileSync(new URL('../public/data.json', import.meta.url), 'utf8'));

const isMcq = (it) => Array.isArray(it.options) && Number.isInteger(it.correct)
  && it.correct >= 0 && it.correct < it.options.length;

const SHAPES = {
  flashcards: (it) => typeof it.front === 'string' && typeof it.back === 'string',
  chooseWord: isMcq,
  possessives: isMcq,
  confusedWords: isMcq,
  prepositions: isMcq,
  chooseLetter: (it) => it.word.split('_').length === 2 && it.options.includes(it.missing),
  accents: (it) => typeof it.plain === 'string' && it.plain.length === it.correct.length,
};

test('data.json has the expected top-level shape', () => {
  expect(data.levels).toEqual(['A1', 'A2', 'B1', 'B2', 'C1']);
  expect(Object.keys(data.exercises).sort()).toEqual(Object.keys(SHAPES).sort());
});

test('every prepositions prompt is localized into all learner languages', () => {
  for (const items of Object.values(data.exercises.prepositions.items)) {
    for (const item of items) {
      expect(item.prompt.en).toBe(item.question);
      for (const lang of ['pl', 'uk', 'ru']) {
        expect(item.prompt[lang]).toEqual(expect.any(String));
        expect(item.prompt[lang].trim().length).toBeGreaterThan(0);
        expect(item.prompt[lang]).not.toBe(item.question);
      }
    }
  }
});

for (const [type, check] of Object.entries(SHAPES)) {
  test(`${type} items are well-formed`, () => {
    const ex = data.exercises[type];
    expect(ex.label).toBeTruthy();
    const bad = [];
    for (const [level, items] of Object.entries(ex.items)) {
      expect(data.levels).toContain(level);
      items.forEach((it, i) => { if (!check(it)) bad.push(`${level}[${i}] ${JSON.stringify(it)}`); });
    }
    expect(bad, `malformed ${type} items`).toEqual([]);
  });

  test(`${type} has enough easy items for a full round`, () => {
    const { A1 = [], A2 = [] } = data.exercises[type].items;
    expect(A1.length + A2.length).toBeGreaterThanOrEqual(12);
  });
}
