const search = require("search-this");
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('google')
		.setDescription(
			'Find anything with google search.'
		).addStringOption((option) =>
			option.setName('text')
				.setDescription('Search text..')
        .setRequired(true)
    ).addStringOption((option) =>
			option.setName('site')
				.setDescription('The specific target site')
        .setRequired(false)
    ).addBooleanOption(option =>
      option.setName('private')
        .setDescription('Hide search result to other user')
        .setRequired(false)
    ),
	async execute(interaction) {
    const text = await interaction.options.getString('text');
    const site = await interaction.options.getString('site');
    const isPrivate = await interaction.options.getBoolean('private');

		const response = await search(`${text}${site != null ? ' site:' + site : ''}`);

    await interaction.reply({ content: response.results[0].link, ephemeral: isPrivate });

    response.results.slice(1, 4).forEach(async (item) => {
      await interaction.followUp({ content: item.link, ephemeral: isPrivate });
    });
	},
};

