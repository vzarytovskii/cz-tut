import { useId, useState } from 'react';
import { useT } from '../SettingsContext';

function splitHint(question) {
  const match = /\(([^()]+)\)/.exec(question);
  if (!match) return null;

  const before = question.slice(0, match.index).trimEnd();
  const after = question.slice(match.index + match[0].length);
  const text = before + (after.startsWith(' ') && before ? ' ' : '') + after.trimStart();
  const blank = text.indexOf('___');
  const precedingWord = /[\p{L}\p{N}][\p{L}\p{N}’'-]*(?=[^\p{L}\p{N}]*$)/u.exec(before);
  const followingWord = /[\p{L}\p{N}][\p{L}\p{N}’'-]*/u.exec(text.slice(before.length));
  const start = blank >= 0 ? blank
    : precedingWord ? precedingWord.index
    : followingWord ? before.length + followingWord.index : -1;
  const word = blank >= 0 ? '___' : precedingWord?.[0] || followingWord?.[0];

  return { text, hint: match[1], start, word };
}

// Translate-into-Czech prompts show only the word, in the learner's language.
// Czech UI falls back to English so the answer isn't given away.
function pickPrompt(prompt, lang) {
  const code = lang === 'cs' || !prompt[lang] ? 'en' : lang;
  return { text: prompt[code], lang: code };
}

export default function QuestionText({ question, prompt }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const hintId = useId();
  const shown = prompt ? pickPrompt(prompt, t.lang) : null;
  const text0 = shown ? shown.text : question;
  const parsed = splitHint(text0);
  const className = shown ? 'question-text prompt-word' : 'question-text';
  const lead = shown && <span className="sr-only">{t('translatePrompt')} </span>;

  if (!parsed || parsed.start < 0) {
    return <p className={className}>{lead}<span lang={shown?.lang}>{text0}</span></p>;
  }

  const { text, hint, start, word } = parsed;
  return (
    <p className={className}>
      {lead}
      <span lang={shown?.lang}>
      {text.slice(0, start)}
      <button
        type="button"
        className={`hint-trigger${open ? ' open' : ''}`}
        aria-label={word === '___' ? t('hintForBlank') : t('hintForWord', { word })}
        aria-describedby={hintId}
        aria-expanded={open}
        onClick={() => setOpen((visible) => !visible)}
        onBlur={() => setOpen(false)}
      >
        {word}
        <span id={hintId} className="hint-tooltip" role="tooltip">{hint}</span>
      </button>
      {text.slice(start + word.length)}
      </span>
    </p>
  );
}
