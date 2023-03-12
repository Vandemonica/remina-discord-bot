require('dotenv').config();

const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN);

(async () => {
	try {
		console.log(`> Refreshing: ${commands.length} commands`);

		const data = await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
			body: commands 
		});

		console.log(`> Success: ${data.length} commands refreshed`);

	} catch (error) {
		console.error(error);

	}
})();
