import BotClient from "../../client/BotClient";
import guild from "./guild";

export const roles = {
    whitelistedRole: async (client: BotClient) => {
        const role = await guild(client)!.roles.fetch('725522608199565323');
        if (!role) return;
        return role;
    }
}