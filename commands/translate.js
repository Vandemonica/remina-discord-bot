const { SlashCommandBuilder } = require('discord.js');
const { translate } = require('../functions/command.js');
const languages = require('../data/languages.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('translate')
		.setDescription(
			'Translate text into you desired language.'
		).addStringOption((option) =>
      option.setName('text')
        .setDescription('Translated text')
        .setRequired(true)
    ).addStringOption((option) =>
      option.setName('from')
        .setDescription('Sources text language')
        .setRequired(false)
        .setAutocomplete(true)
    ).addStringOption((option) =>
      option.setName('to')
        .setDescription('Target text language')
        .setRequired(false)
        .setAutocomplete(true)
    ).addBooleanOption((option) =>
      option.setName('private')
        .setDescription('Display command result for everyone')
        .setRequired(false)
    ),
  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused().toLowerCase();
    const choices = Object.keys(languages);
    const filtered = choices.filter(choice => {
      return `${choice} - ${languages[choice]}`.toLowerCase().search(focusedValue) != -1
    });

    if (filtered.length < 25) {
      await interaction.respond(
        filtered.map(choice => ({
          name: `${choice} - ${languages[choice]}`,
          value: choice
        })),
      );
    } else {
      await interaction.respond([
        { name: 'en - English', value: 'en' },
        { name: 'fr - French', value: 'fr' },
        { name: 'de - German', value: 'de' },
        { name: 'id - Indonesian', value: 'id' },
        { name: 'pt-PT - Portuguese', value: 'pt-PT' },
        { name: 'es - Spanish', value: 'es' },
        { name: 'ja - Japanese', value: 'ja' },
        { name: 'ko - Korean', value: 'ko' },
        { name: 'zh-Hans - Chinese Simplified', value: 'zh-Hans' },
        { name: 'zh-Hant - Chinese Traditional', value: 'zh-Hant' }
      ])
    }
  },
	async execute(interaction) {
		const text = await interaction.options.getString('text');
    const from = await interaction.options.getString('from') ?? 'auto-detect';
    const to = await interaction.options.getString('to') ?? 'en';
    const isPrivate = await interaction.options.getBoolean('private');

    await translate(interaction, text, from, to, isPrivate);
	},
};
