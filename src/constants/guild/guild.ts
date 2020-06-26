import BotClient from "../../client/BotClient";

export default (client: BotClient) => {
    const guild = client.guilds.resolve('725520279438229534');
    if (!guild) return;
    return guild;
}