require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { findWord } = require('./functions/utility.js');
const { pfp, doGoogle } = require('./functions/command.js');


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

client.on(Events.MessageCreate, async (interaction) => {
	if (interaction.mentions.has(client.user)) {
		const messages = interaction.content.split('> ')[1];
		const mentions = interaction.mentions;

		if (findWord('pfp', messages)) {
			const results = await pfp(mentions.repliedUser);
			await interaction.channel.send(results);

		} else if (findWord('google', messages)) {
			const repliedMessage = await interaction.fetchReference();

			await doGoogle(interaction, repliedMessage.content, null, false);
		}
	}
});

client.once(Events.ClientReady, (interaction) => {
	console.log(`Logged in as: ${interaction.user.tag}`);
});



client.login(process.env.CLIENT_TOKEN);
