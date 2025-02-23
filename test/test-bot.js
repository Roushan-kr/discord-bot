import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});

const envVariables = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  APP_ID: process.env.APP_ID,
  PUBLIC_KEY: process.env.PUBLIC_KEY,
  IPINFO_TOKEN: process.env.IPINFO_TOKEN,
  CLIENT_ID: process.env.CLIENT_ID,
};

Object.freeze(envVariables);

Object.keys(envVariables).forEach((k) => {
  if (!envVariables[k]) {
    console.error(`ERROR: ${k} is missing!`);
    process.exit(1);
  }
});

// Initialize bot
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

bot.once('ready', () => {
  console.log(`✅ Test Passed: Bot is online as ${bot.user.tag}`);

  // Exit after 10 seconds (for CI/CD testing)
  setTimeout(() => {
    console.log('🛑 Exiting test...');
    process.exit(0);
  }, 10000);
});

// Start bot
bot.login(envVariables.TOKEN).catch((err) => {
  console.error('ERROR: Failed to login', err);
  process.exit(1);
});
