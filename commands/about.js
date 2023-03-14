const { SlashCommandBuilder, Integration } = require('discord.js');
const { doGoogle } = require('../functions/command.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription(
			'Help and guide of this bot!'
		).addBooleanOption((option) =>
      option.setName('private')
        .setDescription('Display command result for everyone')
        .setRequired(false)
    ),
	async execute(interaction) {
    const isPrivate = await interaction.options.getBoolean('private');

    const embed = {
      color: 0xf1c40f,
      thumbnail: {
        url: interaction.client.user.displayAvatarURL()
      },
      title: 'About me',
      description: "Random discord bot with random features, Reply messages and mention me for quick command.\n\nBelow are supported slash (/) command:",
      fields: [
        { name: 'google', value: 'Google search anything you want', inline: true },
        { name: 'pfp', value: 'Grab your or replied user profile pictures', inline: true },
        { name: 'translate', value: 'Translate text from/to another language', inline: true },
        { name: '\u200B', value: '\u200B' },
        {
          name: 'Sources Code',
          value: 'https://github.com/Vandemonica/remina-discord-bot',
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'Remina discord bot by Vandemonica',
        icon_url: 'https://avatars.githubusercontent.com/u/66208743',
      }
    };

    await interaction.reply({ embeds: [embed], ephemeral: isPrivate });
	},
};
