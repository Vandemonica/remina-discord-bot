const { SlashCommandBuilder } = require('discord.js');
const { doGoogle } = require('../functions/command.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('google')
		.setDescription(
			'Find anything with google search'
		).addStringOption((option) =>
			option.setName('text')
				.setDescription('Search text')
        .setRequired(true)
    ).addStringOption((option) =>
			option.setName('site')
				.setDescription('The specific target site')
        .setRequired(false)
    ).addBooleanOption((option) =>
      option.setName('private')
        .setDescription('Display command result for everyone')
        .setRequired(false)
    ),
	async execute(interaction) {
    const text = await interaction.options.getString('text');
    const site = await interaction.options.getString('site');
    const isPrivate = await interaction.options.getBoolean('private');

    await doGoogle(interaction, text, site, isPrivate);
	},
};

