// Czech UI keeps translation tasks in English to avoid revealing the answer.
function learnerLanguage(lang) {
  return lang === 'cs' ? 'en' : lang;
}

export function localizeQuestion({ question, prompt, questionTranslations }, lang) {
  if (prompt) {
    const code = learnerLanguage(lang);
    return { text: prompt[code], lang: code };
  }
  if (questionTranslations) {
    return { text: lang === 'en' ? question : questionTranslations[lang], lang };
  }
  return { text: question, lang: 'cs' };
}

export function localizeOptions({ options, optionsTranslations }, lang) {
  if (!optionsTranslations) return { options, lang: 'cs' };
  const code = lang === 'cs' && !optionsTranslations.cs ? 'en' : lang;
  return {
    options: code === 'en' ? options : optionsTranslations[code],
    lang: code,
  };
}

export function localizeLetterHint({ hint, hintTranslations }, lang) {
  const code = learnerLanguage(lang);
  return { text: code === 'en' ? hint : hintTranslations[code], lang: code };
}
