import { CacheType, Interaction } from 'discord.js';
import { pingExecute, sendEmailViaExcel, chatMe } from '../commands/index.js';

export async function handleInteraction(interaction: Interaction<CacheType>) {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await pingExecute(interaction);
  }

  if (interaction.commandName === 'send') {
    await sendEmailViaExcel(interaction);
  }

  if (interaction.commandName === 'chatme') {
    await chatMe(interaction);
  }
}
