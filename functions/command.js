// ===================================================================
// ====================== Command Function ===========================
// ===================================================================

const languages = require('../data/languages.json');
const currencies = require('../data/currencies.json');
const { formatNumber, cardBasic } = require('./utility.js');

const CC = require('currency-converter-lt');
const { translate: ts } = require('bing-translate-api');

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


// ===================================================================
// Bing Translate
// ===================================================================
async function translate(interaction, text, from = 'auto-detect', to = 'en', ephemeral = false) {
  // language with auto-correct support
  const correctAble = [
    'da', 'en', 'nl', 'fi', 'fr', 'fr-CA',
    'de', 'it', 'ja', 'ko', 'no', 'pl', 'pt', 'pt-PT',
    'ru', 'es', 'sv', 'tr', 'zh-Hant', 'zh-Hans'
  ];

  const icon = 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Microsoft_Translator_Logo.svg/640px-Microsoft_Translator_Logo.svg.png';
  const response = await ts(text,
    from,
    to,
    correctAble.includes(from)
  ).then((response) => {
    return response;
  }).catch(() => {
    return null;
  });

  const langFrom = typeof languages[from] !== 'undefined' ? languages[from] : 'Auto-Detect';
  const langTo = languages[to];

  let correction = null;
  let fields = [
    { name: langFrom, value: text, inline: true },
    { name: '\u200B', value: '\u200B', inline: true },
    { name: langTo, value: text, inline: true }
  ];

  if (response != null) {
    correction = response.text;

    if (typeof response.correctedText !== 'undefined' && response.correctedText != '') {
      correction = response.correctedText;
    }

    fields = [
      { name: langFrom, value: correction, inline: true },
      { name: '\u200B', value: '\u200B', inline: true },
      { name: langTo, value: response.translation, inline: true }
    ];

    if (response.correctedText) {
      fields.unshift({ name: 'Original text:', value: response.text }, { name: '\u200B', value: '\u200B' });
    }
  }

  console.log(fields);

  const results = cardBasic('Translate Text', fields, icon);

  const redirectButton = new ButtonBuilder()
	  .setLabel('Open Bing Translator')
	  .setURL(encodeURI(`https://www.bing.com/translator/?from=${from}&to=${to}&text=${text}`))
	  .setStyle(ButtonStyle.Link);

  const row = new ActionRowBuilder().addComponents(redirectButton);

  await interaction.reply({ embeds: results, components: [row], ephemeral: ephemeral });
}

// ===================================================================
// Profile Pic Grabber
// ===================================================================
async function pfp(interaction, user, ephemeral = false) {
  let avatar = user.displayAvatarURL();

  if (user.avatar != null) {
    avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=2048`;
  }

  await interaction.reply({ content: avatar, ephemeral: ephemeral });
}

// ===================================================================
// Currency Converter
// ===================================================================
async function currency(interaction, amount, from, to, ephemeral = false) {

  const icon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Icons8_flat_currency_exchange.svg/512px-Icons8_flat_currency_exchange.svg.png';
  const currencyConverter = new CC({
    from: from,
    to: to,
    amount: Math.abs(parseInt(amount))
  });

  const fromAmount = formatNumber(amount);
  const toAmount = formatNumber(await currencyConverter.convert());

  const fields = [
    { name: currencies[from].name, value: `${currencies[from].symbol} ${fromAmount}.00`, inline: true },
    { name: '\u200B', value: '\u200B', inline: true },
    { name: currencies[to].name, value: `${currencies[to].symbol} ${toAmount}.00`, inline: true }
  ];

  const results = cardBasic('Currency Converter', fields, icon);

  await interaction.reply({ embeds: results, ephemeral: ephemeral });
}



module.exports = {
  translate, pfp, currency
};
