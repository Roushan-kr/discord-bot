import dotenv from 'dotenv';

const envVariables = () => {
  // Load environment variables
  dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
  });

  const envVariables = {
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    APP_ID: process.env.APP_ID,
    PUBLIC_KEY: process.env.PUBLIC_KEY,
    IPINFO_TOKEN: process.env.IPINFO_TOKEN,
    CLIENT_ID: process.env.CLIENT_ID,
  };

  Object.freeze(envVariables);
  return envVariables
};

export { envVariables };
