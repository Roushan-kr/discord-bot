import { pingExecute } from "../commands/ping.js";
export async function handelInteraction(interaction) {
    if (!interaction.isChatInputCommand())
        return;
    if (interaction.commandName === "ping") {
        await pingExecute(interaction);
    }
}
