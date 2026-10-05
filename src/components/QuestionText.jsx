import { useT } from '../SettingsContext';
import { localizeHint } from '../hintTranslations';
import { localizeQuestion } from '../exerciseContent';

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

export default function QuestionText({ question, prompt, questionTranslations }) {
  const t = useT();
  const shown = localizeQuestion({ question, prompt, questionTranslations }, t.lang);
  const parsed = splitHint(shown.text);
  const className = prompt ? 'question-text prompt-word' : 'question-text';
  const lead = prompt && <span className="sr-only">{t('translatePrompt')} </span>;

  if (!parsed || parsed.start < 0) {
    return <p className={className}>{lead}<span lang={shown.lang}>{shown.text}</span></p>;
  }

  const { text, hint, start, word } = parsed;
  const translated = (prompt || questionTranslations) && shown.lang !== 'en';
  const hintLang = translated ? shown.lang : t.lang;
  const localizedHint = translated ? hint : localizeHint(hint, hintLang);
  return (
    <p className={className}>
      {lead}
      <span lang={shown.lang}>
      {text.slice(0, start)}
      <span className="question-hint-anchor">
        <span className="question-hint" lang={hintLang}>{localizedHint}</span>
        <span className="question-hint-target">{word}</span>
      </span>
      {text.slice(start + word.length)}
      </span>
    </p>
  );
}
