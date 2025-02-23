import { Message } from "discord.js";

export const handelClientMsg = async (message: Message<boolean>) => {
  if (message.author.bot) return;
  
  if (message.content.startsWith("hi ")) {
    message.reply(
      `👋 Welcome ${message.author.globalName}, hope you take your notes!`
    );
  }
};
