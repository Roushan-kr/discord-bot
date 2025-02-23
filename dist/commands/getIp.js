import axios from "axios";
export async function getServerIP(ip) {
    try {
        const res = await axios.get(`https://api64.ipify.org?format=json`);
        console.log(`🌍 Bot's Server IP: ${res.data.ip}`);
    }
    catch (error) {
        console.error("Failed to get server IP:", error);
    }
}
