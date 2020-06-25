import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping']
        });
    }

    async exec(msg: Message) {
        const ping = Math.round(Date.now() - msg.createdTimestamp);
        const res = await msg.channel.send('🕐 Pinging...');
        res.edit(`✅ **Pong!** Heartbeat: ${ping}`);
    }

}