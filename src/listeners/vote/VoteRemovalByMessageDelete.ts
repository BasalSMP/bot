import { Listener } from "discord-akairo";
import { Message } from "discord.js";
import { channels } from "../../constants/guild/channels";
import { VoteModel } from "../../models/Vote";

export default class VoteRemovalByMessageDelete extends Listener {
    constructor() {
        super('VoteRemovalByMessageDelete', {
            emitter: 'client',
            event: 'messageDelete'
        });
    }

    async exec(msg: Message) {
        const whitelistChannel = await channels.whitelistChannel(this.client);
        if (msg.channel === whitelistChannel) {
            const vote = await VoteModel.findOne({ discordMessage: msg.id }).exec();
            if (!vote) return;
            await vote.settleVote(this.client);
        }
    }

}