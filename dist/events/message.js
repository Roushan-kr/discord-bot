import axios from 'axios';
const userjoke = async () => {
    try {
        const res = await axios.get('https://v2.jokeapi.dev/joke/Programming');
        // console.log(res);
        return res.data.joke
            ? res.data.joke
            : `setup: ${res.data.setup} \n delivery:${res.data.delivery}`;
    }
    catch (error) {
        console.error(error);
        return 'I think you have done somthing 🤞 naughty';
    }
};
export const handelClientMsg = async (message) => {
    if (message.author.bot)
        return;
    if (message.content.startsWith('hi ')) {
        const tip = await userjoke();
        message.reply(`👋 Welcome ${message.author.globalName}, \n Bot Gess a joke for you: \n ${tip}`);
    }
};
