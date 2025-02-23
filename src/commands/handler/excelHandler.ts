import axios from "axios";
import * as XLSX from "xlsx";
import { sendIndividualEmails, sendBulkEmail } from "../../service/mail.js";
import { ChatInputCommandInteraction } from "discord.js";

export const handleExcelUpload = async (fileUrl: string, fName:string, interaction: ChatInputCommandInteraction) => {
  try {
    // Download the file
    const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
    // console.log(response)
    const fileExtension = fName.split(".").pop()?.toLowerCase();

    let sheetData;

    if (fileExtension === "csv") {
      // Convert CSV to JSON
      const csvString = response.data.toString("utf-8");
      const workbook = XLSX.read(csvString, { type: "string" });
      sheetData = XLSX.utils.sheet_to_json<{ sandTo?: string; subject?: string; message?: string }>(
        workbook.Sheets[workbook.SheetNames[0]]
      );
    } else if (fileExtension === "xlsx") {
      // Process .xlsx file
      const workbook = XLSX.read(response.data, { type: "buffer" });
      sheetData = XLSX.utils.sheet_to_json<{ sandTo?: string; subject?: string; message?: string }>(
        workbook.Sheets[workbook.SheetNames[0]]
      );
    } else {
      return interaction.editReply("❌ Unsupported file format. Please upload a .xlsx or .csv file.");
    }

    if (sheetData.length === 0) {
      return interaction.editReply("⚠️ The uploaded file is empty.");
    }

    // Filter out invalid rows where any field is missing or undefined
    const filteredSheet = sheetData.filter(
      (row): row is { sandTo: string; subject: string; message: string } =>
        typeof row.sandTo === "string" &&
        typeof row.subject === "string" &&
        typeof row.message === "string" &&
        row.sandTo.trim() !== "" &&
        row.subject.trim() !== "" &&
        row.message.trim() !== ""
    );

    if (filteredSheet.length === 0) {
      return interaction.editReply("⚠️ No valid rows found. Ensure all fields are filled.");
    }

    const emails = filteredSheet.map((row) => row.sandTo.trim()!);
    const messages = filteredSheet.map((row) => row.message!);
    const subjects = filteredSheet.map((row) => row.subject!);

    // Check if all columns have the same length
    if (emails.length !== messages.length || messages.length !== subjects.length) {
      return interaction.editReply("⚠️ All rows must have values for `sandTo`, `subject`, and `message`.");
    }

    if (new Set(messages).size === 1) {
      // Send bulk email if all messages are the same
      await sendBulkEmail(emails, messages[0], subjects[0]);
      await interaction.editReply("✅ Bulk email sent successfully!");
    } else {
      // Send individual emails if messages vary
      await sendIndividualEmails(filteredSheet);
      await interaction.editReply("✅ Individual emails sent successfully!");
    }
  } catch (error) {
    console.error("❌ Error processing file:", error);
    await interaction.editReply("❌ Failed to process the uploaded file. Please check the format.");
  }
};
