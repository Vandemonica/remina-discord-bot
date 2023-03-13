// ===================================================================
// ====================== Utility Function ===========================
// ===================================================================

const languages = require('../language.json');


function findWord(search, string) {
  return RegExp('\\b' + search + '\\b').test(string);
}

function cardTranslate(response) {
  let correction = response.text;
  if (typeof response.correctedText !== 'undefined' && response.correctedText != '') {
    correction = response.correctedText;
  }

  const fields = [
    { name: languages[response.language.from], value: correction, inline: true },
    { name: '\u200B', value: '\u200B', inline: true },
    { name: languages[response.language.to], value: response.translation, inline: true }
  ];

  if (response.correctedText) {
    fields.unshift({ name: 'Original text:', value: response.text }, { name: '\u200B', value: '\u200B' });
  }

  const result = {
    color: 0xf1c40f,
    title: 'Translate result:',
    thumbnail: {
      url: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Microsoft_Translator_Logo.svg/640px-Microsoft_Translator_Logo.svg.png',
    },
    fields: fields
  };

  return [result];
}


module.exports = {
  findWord,
  cardTranslate
};
