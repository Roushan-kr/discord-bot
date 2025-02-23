import { Client } from "discord.js";

export default (bot: Client) => {
  bot.once("ready", () => {
    console.log(`🤖 Bot is online as ${bot.user?.tag}`);
  });
};
