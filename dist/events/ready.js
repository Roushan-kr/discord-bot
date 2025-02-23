export default (bot) => {
    bot.once("ready", () => {
        console.log(`🤖 Bot is online as ${bot.user?.tag}`);
    });
};
