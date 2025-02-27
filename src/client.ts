import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import {
  chatMeCommand,
  pingCommand,
  sendEmailCommand,
} from './commands/index.js';

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

export async function registerCommands() {
  const commands = [
    pingCommand.toJSON(),
    sendEmailCommand.toJSON(),
    chatMeCommand.toJSON(),
  ];
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);
  try {
    console.log('🔄 Registering slash commands...');
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
      body: commands,
    });
    console.log('✅ Slash commands registered.');
  } catch (error) {
    console.error('❌ Failed to register commands:', error);
  }
}
