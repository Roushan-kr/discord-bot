import { Client, GatewayIntentBits } from 'discord.js';
import { envVariables } from '../dist/utils/config.js';

const env = envVariables()
Object.keys(env).forEach((k) => {
  if (!env[k]) {
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
