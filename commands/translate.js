const { SlashCommandBuilder } = require('discord.js');
const { translate } = require('../functions/command.js');

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
        .addChoices(
          { name: 'English', value: 'en' },
          { name: 'French', value: 'fr' },
          { name: 'German', value: 'de' },
          { name: 'Indonesian', value: 'id' },
          { name: 'Portuguese', value: 'pt-PT' },
          { name: 'Spanish', value: 'es' },
          { name: 'Japanese', value: 'ja' },
          { name: 'Korean', value: 'ko' },
          { name: 'Chinese Simplified', value: 'zh-Hans' },
          { name: 'Chinese Traditional', value: 'zh-Hant' }
        )
    ).addStringOption((option) =>
      option.setName('to')
        .setDescription('Target text language')
        .setRequired(false)
        .addChoices(
          { name: 'English', value: 'en' },
          { name: 'French', value: 'fr' },
          { name: 'German', value: 'de' },
          { name: 'Indonesian', value: 'id' },
          { name: 'Portuguese', value: 'pt-PT' },
          { name: 'Spanish', value: 'es' },
          { name: 'Japanese', value: 'ja' },
          { name: 'Korean', value: 'ko' },
          { name: 'Chinese Simplified', value: 'zh-Hans' },
          { name: 'Chinese Traditional', value: 'zh-Hant' }
        )
    ).addBooleanOption((option) =>
      option.setName('private')
        .setDescription('Display command result for everyone')
        .setRequired(false)
    ),
	async execute(interaction) {
		const text = await interaction.options.getString('text');
    const from = await interaction.options.getString('from') ?? 'auto-detect';
    const to = await interaction.options.getString('to') ?? 'en';
    const isPrivate = await interaction.options.getBoolean('private');

    await translate(interaction, text, from, to, isPrivate);
	},
};
