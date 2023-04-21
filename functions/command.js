// ===================================================================
// ====================== Command Function ===========================
// ===================================================================

const { cardTranslate } = require('./utility.js');

const { translate: ts } = require('bing-translate-api');


// Bing Translate
// ===============================================
async function translate(interaction, text, from = 'auto-detect', to = 'en', ephemeral = false) {
  const correctAble = [
    'da', 'en', 'nl', 'fi', 'fr', 'fr-CA',
    'de', 'it', 'ja', 'ko', 'no', 'pl', 'pt', 'pt-PT',
    'ru', 'es', 'sv', 'tr', 'zh-Hant', 'zh-Hans'
  ];

  const response = await ts(text, from, to, correctAble.includes(from)).then((response) => {
    return response;
  }).catch((error) => {
    console.error(error);
  });

  const results = cardTranslate(response);

  await interaction.reply({ embeds: results, ephemeral: ephemeral });
}

// Profile Pic Grabber
// ===============================================
async function pfp(interaction, user, ephemeral = false) {
  let avatar = user.displayAvatarURL();

  if (user.avatar != null) {
    avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=2048`;
  }

  await interaction.reply({ content: avatar, ephemeral: ephemeral });
}



module.exports = {
  translate, pfp
};
