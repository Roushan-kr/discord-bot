import { CacheType, Interaction } from "discord.js";
import { pingExecute } from "../commands/ping.js";

export async function handelInteraction(interaction: Interaction<CacheType>) {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === "ping") {
      await pingExecute(interaction);
    }
  }
  