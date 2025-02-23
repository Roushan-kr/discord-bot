import { SlashCommandBuilder } from 'discord.js';
import axios from 'axios';
import { PingReply } from '../utils/format.js';
export const pingCommand = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Fetch detailed info for an IP address')
    .addStringOption((option) => option.setName('ip').setDescription('Enter an IP address').setRequired(true));
export async function pingExecute(interaction) {
    await interaction.deferReply(); // Bot shows "thinking..." while fetching data
    const userIP = interaction.options.getString('ip', true); // Get user-provided IP
    const token = process.env.IPINFO_TOKEN; // Load API key
    if (!token) {
        return await interaction.editReply("Sorry it's seerver fault i repair it soon");
    }
    try {
        // Fetch IP info from ipinfo.io
        const res = await axios.get(`https://ipinfo.io/${userIP}/json?token=${token}`);
        // Format the response into an embed
        const embed = PingReply(userIP, res.data);
        await interaction.editReply({ embeds: [embed] });
    }
    catch (error) {
        console.error('Error fetching IP info:', error);
        await interaction.editReply('⚠️ Failed to fetch IP details.');
    }
}
