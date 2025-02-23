import dotenv from 'dotenv';
import { client, registerCommands } from './client.js';
import { handelClientMsg } from './events/message.js';
import { handelInteraction, } from './events/interaction.js';
dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});
client.once('ready', async () => {
    if (client.user) {
        console.log(`Bot is online as ${client.user.tag}`);
        await registerCommands();
    }
    else {
        console.log('Bot is online, but user is not available.');
    }
});
client.on('messageCreate', handelClientMsg);
client.on('interactionCreate', handelInteraction);
client.login(process.env.DISCORD_TOKEN);
