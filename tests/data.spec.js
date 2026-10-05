import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { localizeHint } from '../src/hintTranslations.js';
import { localizeExplanation } from '../src/explanationTranslations.js';
import { localizeQuestion, localizeOptions, localizeLetterHint } from '../src/exerciseContent.js';
import { LANGUAGES, STRINGS, translate, exerciseText } from '../src/i18n.js';

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

test('every parenthetical question hint has localized text', () => {
  for (const exercise of Object.values(data.exercises)) {
    for (const items of Object.values(exercise.items)) {
      for (const item of items) {
        const match = /\(([^()]+)\)/.exec(item.prompt?.en || item.question || '');
        if (!match) continue;
        const hint = match[1];
        expect(localizeHint(hint, 'en')).toBe(hint);
        for (const lang of ['cs', 'pl', 'uk', 'ru']) {
          const localized = localizeHint(hint, lang);
          expect(localized.trim().length).toBeGreaterThan(0);
          if (lang === 'cs' && ['existence', 'výzkum'].includes(hint)) continue;
          expect(localized, `${lang}: ${hint}`).not.toBe(hint);
        }
      }
    }
  }
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

test('translation questions have no redundant framing', () => {
  for (const type of ['chooseWord', 'confusedWords']) {
    for (const items of Object.values(data.exercises[type].items)) {
      for (const item of items) {
        for (const text of [item.question, ...Object.values(item.prompt || {})]) {
          expect(text).not.toMatch(/\b(?:is|are)(?: correctly spelled)?\s*:\s*$/i);
          expect(text).not.toMatch(/^What does ['"].*['"] mean\b/i);
          expect(text).not.toMatch(/^Which is correct\?/i);
          expect(text).not.toMatch(/^['"].*['"] vs ['"].*['"]:\s*$/i);
        }
      }
    }
  }
});

test('all learner prompts, instructions, hints, and choices have complete localization', () => {
  for (const [type, exercise] of Object.entries(data.exercises)) {
    for (const [level, items] of Object.entries(exercise.items)) {
      for (const [index, item] of items.entries()) {
        const location = `${type}.${level}[${index}]`;
        if (type === 'confusedWords') expect(item.prompt || item.questionTranslations, location).toBeTruthy();
        if (type === 'chooseWord' && !item.prompt && !item.questionTranslations) {
          expect(item.question, location).not.toMatch(/^(?:Which|What|Who|How|Imperative|The)\b/);
          if (!item.question.includes('___')) expect(item.optionsTranslations, location).toBeTruthy();
        }
        if (item.prompt) {
          expect(item.prompt.en, location).toBe(item.question);
          expect(Object.keys(item.prompt).sort(), location).toEqual(['en', 'pl', 'ru', 'uk']);
        }
        if (item.questionTranslations) {
          expect(Object.keys(item.questionTranslations).sort(), location).toEqual(['cs', 'pl', 'ru', 'uk']);
        }
        if (type === 'chooseLetter') {
          expect(Object.keys(item.hintTranslations || {}).sort(), location).toEqual(['pl', 'ru', 'uk']);
        }
        if (item.optionsTranslations) {
          for (const lang of ['pl', 'uk', 'ru']) expect(item.optionsTranslations[lang], location).toBeTruthy();
          for (const choices of Object.values(item.optionsTranslations)) {
            expect(choices, location).toHaveLength(item.options.length);
            expect(new Set(choices).size, `${location}: distinct translated choices`).toBe(choices.length);
          }
        }
        for (const { code: lang } of LANGUAGES) {
          const learnerLang = lang === 'cs' ? 'en' : lang;
          if (item.question) {
            const question = localizeQuestion(item, lang);
            expect(question.text, `${location}: ${lang} question`).toEqual(expect.any(String));
            expect(question.text.trim().length, location).toBeGreaterThan(0);
            expect(question.lang).toBe(item.prompt ? learnerLang : item.questionTranslations ? lang : 'cs');
          }
          if (item.options) {
            const choices = localizeOptions(item, lang);
            expect(choices.options, `${location}: ${lang} choices`).toHaveLength(item.options.length);
            for (const choice of choices.options) {
              expect(choice, location).toEqual(expect.any(String));
              expect(choice.trim().length, location).toBeGreaterThan(0);
            }
          }
          if (type === 'chooseLetter') {
            const hint = localizeLetterHint(item, lang);
            expect(hint.lang).toBe(learnerLang);
            expect(hint.text, `${location}: ${lang} hint`).toEqual(expect.any(String));
            expect(hint.text.trim().length, location).toBeGreaterThan(0);
          }
          if (item.explanation) {
            const explanation = localizeExplanation(item.explanation, lang);
            expect(explanation.trim().length, `${location}: ${lang} explanation`).toBeGreaterThan(0);
            if (lang !== 'en') expect(explanation, location).not.toBe(item.explanation);
          }
        }
      }
    }
  }
});

test('all interface strings and exercise labels are localized without fallback', () => {
  for (const { code: lang } of LANGUAGES) {
    expect(Object.keys(STRINGS[lang]).sort()).toEqual(Object.keys(STRINGS.en).sort());
    for (const key of Object.keys(STRINGS.en).filter((key) => key !== 'exercises')) {
      for (const n of [0, 1, 2, 5]) {
        const text = translate(lang, key, { n, score: 2, total: 12, word: '___' });
        expect(text.trim().length, `${lang}: ${key}`).toBeGreaterThan(0);
        expect(text).not.toMatch(/\{\w+\}/);
      }
    }
    expect(Object.keys(STRINGS[lang].exercises).sort()).toEqual(Object.keys(data.exercises).sort());
    for (const type of Object.keys(data.exercises)) {
      const text = exerciseText(lang, type);
      expect(text.label.trim().length, `${lang}: ${type} label`).toBeGreaterThan(0);
      expect(text.description.trim().length, `${lang}: ${type} description`).toBeGreaterThan(0);
    }
  }
});

test('every flashcard prompt is localized for each interface language', () => {
  for (const items of Object.values(data.exercises.flashcards.items)) {
    for (const item of items) {
      expect(item.frontTranslations).toBeTruthy();
      expect(Object.keys(item.frontTranslations).sort()).toEqual(['pl', 'ru', 'uk']);
      for (const lang of ['pl', 'uk', 'ru']) {
        expect(item.frontTranslations[lang]).toEqual(expect.any(String));
        expect(item.frontTranslations[lang].trim().length).toBeGreaterThan(0);
      }
    }
  }

  const garnet = data.exercises.flashcards.items.A2.find((item) => item.front === 'garnet (gemstone)');
  expect(garnet.frontTranslations).toEqual({
    pl: 'granat (kamień szlachetny)',
    ru: 'гранат (драгоценный камень)',
    uk: 'гранат (дорогоцінний камінь)',
  });
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
