import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { messages } from "../../constants/guild/messages";

export default class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping']
        });
    }

    async exec(msg: Message) {
        const res = await msg.channel.send(messages.util.ping.pingingMessage);
        res.edit(messages.util.ping.pingOutput(this.client.ws.ping));
    }

}