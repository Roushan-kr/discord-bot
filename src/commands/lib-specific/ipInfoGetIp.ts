import { IPinfoWrapper } from 'node-ipinfo';

const ipinfo = new IPinfoWrapper(process.env.IPINFO_TOKEN);

// This is reserved for /ping intraction, not used right now
export const fetchIPInfo = async (ip: string) => {
  try {
    const data = await ipinfo.lookupIp(ip);
    return data;
  } catch (error) {
    console.error('Error fetching IP info:', error);
    return null;
  }
};
