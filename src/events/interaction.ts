import { CacheType, Interaction } from 'discord.js';
import { pingExecute } from '../commands/ping.js';
import { sendEmailViaExcel } from '../commands/send.js';

export async function handleInteraction(interaction: Interaction<CacheType>) {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await pingExecute(interaction);
  }

  if (interaction.commandName === 'send') {
    await sendEmailViaExcel(interaction);
  }
}
