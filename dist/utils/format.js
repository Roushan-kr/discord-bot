import { EmbedBuilder } from 'discord.js';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PingReply(userIP, data) {
    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`📍 IP Info for ${userIP}`)
        .addFields({ name: '🌍 Country', value: data.country || 'N/A', inline: true }, { name: '🏙️ City', value: data.city || 'N/A', inline: true }, { name: '🏢 ISP', value: data.org || 'N/A', inline: true }, { name: '🔹 ASN', value: data.asn?.asn || 'N/A', inline: true }, { name: '🕒 Timezone', value: data.timezone || 'N/A', inline: true }, { name: '🌐 Location (Lat/Lon)', value: data.loc || 'N/A', inline: true }, { name: '📧 Reverse DNS', value: data.hostname || 'N/A', inline: true }, {
        name: '🔍 Abuse Info',
        value: data.abuse ? `Contact: ${data.abuse.email}` : 'N/A',
        inline: true,
    })
        .setFooter({ text: 'Data from ipinfo.io' });
    return embed;
}
