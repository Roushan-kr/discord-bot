import {
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from 'discord.js';
import { genStream } from '../utils/AI/versel-google.js';

// Define the slash command
export const chatMeCommand = new SlashCommandBuilder()
  .setName('chatme')
  .setDescription('Chat with your personal assistant privately.')
  .addStringOption(
    (option) =>
      option
        .setName('prompt')
        .setDescription('Enter your prompt')
        .setRequired(true) // Ensures the prompt is mandatory
  );

export async function chatMe(interaction: ChatInputCommandInteraction) {
  const userId = interaction.user.id;
  const prompt = interaction.options.getString('prompt', true); // Ensures prompt is always provided

  try {
    // Defer reply to prevent interaction timeout (ephemeral for privacy)
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const stream = await genStream(userId, prompt);
    let response = '';

    for await (const chunk of stream) {
      const chunkStr =
        typeof chunk === 'string' ? chunk : new TextDecoder().decode(chunk);
      if (!chunkStr.trim()) continue; // Skip empty chunks

      if (response.length + chunkStr.length > 1900) {
        await interaction.followUp({
          content: response,
          flags: MessageFlags.Ephemeral,
        });
        response = ''; // Reset for next chunk
      }

      response += chunkStr;
    }

    // Ensure at least one message is sent
    if (response) {
      await interaction.editReply({ content: response });
    } else {
      await interaction.editReply({
        content: 'No meaningful response generated.',
      });
    }
  } catch (error) {
    console.error(`Error handling /chatme command for user ${userId}:`, error);

    try {
      await interaction.editReply({
        content: 'An error occurred while processing your request.',
      });
    } catch (editError) {
      console.error('Failed to edit reply, sending follow-up:', editError);
      try {
        await interaction.followUp({
          content: 'An error occurred while processing your request.',
          flags: MessageFlags.Ephemeral,
        });
      } catch (followUpError) {
        console.error('Failed to send follow-up message:', followUpError);
      }
    }
  }
}
