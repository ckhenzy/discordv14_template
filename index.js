const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

require('dotenv').config(); // Loading in .env file

const client = new Client({ intents: [GatewayIntentBits.Guilds] }); // Creating a client

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'src/commands');
const eventsPath = path.join(__dirname, 'src/events');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

// Loading in commands
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// Loading in events
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(process.env.TOKEN); // Logging in the client
