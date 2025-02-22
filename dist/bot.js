import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});
client.once('ready', () => {
    if (client.user) {
        console.log(`🤖 Bot is online as ${client.user.tag}`);
    }
    else {
        console.log('🤖 Bot is online, but user is not available.');
    }
});
client.on('messageCreate', (message) => {
    if (message.content === '!ping') {
        message.reply('Pong! 🏓');
    }
});
client.login(process.env.DISCORD_TOKEN);
