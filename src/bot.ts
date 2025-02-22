import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === "production" ? ".env.production" : ".env" });

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
  } else {
    console.log('🤖 Bot is online, but user is not available.');
  }
});

client.on('messageCreate', (message) => {
  if (message.content.startsWith("hi "){
    message.reply(`welcome ${message.author.globalName}, hope you takes your notes`)
  }
});

client.login(process.env.DISCORD_TOKEN);
