import {
  Attachment,
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from 'discord.js';
import { handleExcelUpload } from './handler/excelHandler.js';

export const sendEmailCommand = new SlashCommandBuilder()
  .setName('send')
  .setDescription(
    'Send email via Excel sheet using sandTo, subject, and message columns.'
  )
  .addAttachmentOption((option) =>
    option
      .setName('sheet')
      .setDescription(
        '📂 Please upload an Excel file in .xlsx or .csv extension'
      )
      .setRequired(true)
  );

export async function sendEmailViaExcel(
  interaction: ChatInputCommandInteraction
) {
  await interaction.deferReply({ flags: MessageFlags.Ephemeral });
  const attachment = interaction.options.getAttachment('sheet') as Attachment;

  if (
    !attachment ||
    !(attachment.name.endsWith('.xlsx') || attachment.name.endsWith('.csv'))
  ) {
    return interaction.editReply(
      '⚠️ Please upload a valid Excel file (.xlsx) or (.csv)'
    );
  }

  try {
    await handleExcelUpload(attachment.url, attachment.name, interaction);
  } catch (error) {
    console.error('❌ Error handling Excel upload:', error);
    await interaction.editReply(
      '❌ An error occurred while processing your request.'
    );
  }
}
