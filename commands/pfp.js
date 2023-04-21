const { SlashCommandBuilder } = require('discord.js');
const { pfp } = require('../functions/command.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pfp')
		.setDescription(
			'Grab your or other user profile pictures'
		).addUserOption((option) =>
			option.setName('target')
				.setDescription('Select target user')
				.setRequired(false)
		).addBooleanOption((option) =>
      option.setName('private')
        .setDescription('Display command result for everyone')
        .setRequired(false)
    ),
	async execute(interaction) {
		const target = await interaction.options.getUser('target');
		const isPrivate = await interaction.options.getBoolean('private');

		await pfp(interaction, target != null ? target : interaction.user, isPrivate);
	},
};
