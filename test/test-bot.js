import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: process.env.NODE_ENV === "production" ? ".env.production" : ".env" });

const TOKEN = process.env.DISCORD_TOKEN;

if (!TOKEN) {
  console.error("❌ ERROR: DISCORD_TOKEN is missing!");
  process.exit(1);
}

// Initialize bot
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

bot.once("ready", () => {
  console.log(`✅ Test Passed: Bot is online as ${bot.user.tag}`);

  // Exit after 10 seconds (for CI/CD testing)
  setTimeout(() => {
    console.log("🛑 Exiting test...");
    process.exit(0);
  }, 10000);
});

// Start bot
bot.login(TOKEN).catch((err) => {
  console.error("❌ ERROR: Failed to login", err);
  process.exit(1);
});
