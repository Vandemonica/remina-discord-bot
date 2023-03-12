const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pfp')
		.setDescription(
			'Grab your or other user profile pictures.'
		).addUserOption((option) =>
			option.setName('target')
				.setDescription('Select target user')
				.setRequired(false)
		),
	async execute(interaction) {
		const target = await interaction.options.getUser('target');
		const user = target != null ? target : interaction.user;

		if (user.avatar != null) {
			await interaction.reply(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=2048`);
		} else {
			await interaction.reply(user.displayAvatarURL());
		}
	},
};
