const { SlashCommandBuilder } = require('discord.js');
const { currency } = require('../functions/command.js');
const currencies = require('../data/currencies.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('currency')
		.setDescription(
			'Convert money currency value'
		).addStringOption((option) =>
      option.setName('from')
        .setDescription('Sources currency code')
        .setRequired(true)
        .setAutocomplete(true)
    ).addStringOption((option) =>
      option.setName('amount')
        .setDescription('Amount of sources currency')
        .setRequired(true)
    ).addStringOption((option) =>
      option.setName('to')
        .setDescription('Target currency code')
        .setRequired(true)
        .setAutocomplete(true)
    ).addBooleanOption((option) =>
      option.setName('private')
        .setDescription('Display command result for everyone')
        .setRequired(false)
    ),
  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused().toLowerCase();
    const choices = Object.keys(currencies);
    const filtered = choices.filter(choice => {
      return `${choice} - ${currencies[choice].name}`.toLowerCase().search(focusedValue) != -1
    });

    if (filtered.length < 25) {
      await interaction.respond(
        filtered.map(choice => ({
          name: `${choice} - ${currencies[choice].name}`,
          value: choice
        })),
      );
    } else {
      await interaction.respond([
        { name: 'USD - United States dollar', value: 'USD' },
        { name: 'EUR - European Euro', value: 'EUR' },
        { name: 'GBP - British pound', value: 'GBP' },
        { name: 'RUB - Russian ruble', value: 'RUB' },
        { name: 'AUD - Australian dollar', value: 'AUD' },
        { name: 'CAD - Canadian dollar', value: 'CAD' },
        { name: 'CNY - Chinese/Yuan renminbi', value: 'CNY' },
        { name: 'JPY - Japanese yen', value: 'JPY' },
        { name: 'IDR - Indonesian rupiah', value: 'IDR' },
        { name: 'KRW - South Korean won', value: 'KRW' },
        { name: 'AED - UAE dirham', value: 'AED' },
        { name: 'SAR - Saudi riyal', value: 'SAR' }
      ])
    }
  },
	async execute(interaction) {
		const amount = await interaction.options.getString('amount');
    const from = await interaction.options.getString('from');
    const to = await interaction.options.getString('to');
    const isPrivate = await interaction.options.getBoolean('private');

		await currency(interaction, amount, from, to, isPrivate);
	},
};
