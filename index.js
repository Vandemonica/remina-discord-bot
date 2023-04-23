require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { Client, Collection, Events, GatewayIntentBits, ActivityType } = require('discord.js');
const { findWord } = require('./functions/utility.js');
const { translate, pfp, currency } = require('./functions/command.js');


const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent
	] 
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	}
}


client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) {
		return false;
	}

	const command = interaction.client.commands.get(interaction.commandName);

	await command.execute(interaction);
});

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isAutocomplete()) {
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.autocomplete(interaction);
		} catch (error) {
			console.error(error);
		}
	}
});

client.on(Events.MessageCreate, async (interaction) => {
	if (interaction.mentions.has(client.user)) {
		const messages = interaction.content.split('> ')[1];
		const mentions = interaction.mentions;

		if (mentions.repliedUser == null) {
			await interaction.reply("You must reply on a message to use quick commands!");
			return;
		};


		if (findWord('pfp', messages)) {
			await pfp(interaction, mentions.repliedUser);

		} else if (findWord('translate', messages)) {
			const repliedMessage = await interaction.fetchReference();
			await translate(interaction, repliedMessage.content);

		}
	}
});

client.once(Events.ClientReady, (interaction) => {
	console.log(`${interaction.user.tag} is online, put the lights on!`);

	client.user.setPresence({
		activities: [{ name: `over humanity`, type: ActivityType.Watching }],
		status: 'online',
	});
});



client.login(process.env.CLIENT_TOKEN);
