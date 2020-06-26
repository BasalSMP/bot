import { Command } from "discord-akairo";
import { Message } from "discord.js";
import MinecraftAccount from "../../structure/MinecraftAccount";
import { messages } from "../../constants/messages";
import { VoteModel } from "../../models/Vote";
import { expirationTimes } from "../../constants/expirationTimes";
import { channels } from "../../constants/channels";

export default class RequestWhitelistCommand extends Command {
    constructor() {
        super('request', {
            aliases: ['request'],
            args: [
                {
                    id: 'minecraftAccount',
                    type: 'minecraftAccount',
                    prompt: messages.whitelist.request.prompt
                }
            ]
        });
    }

    async exec(msg: Message, { minecraftAccount }: { minecraftAccount: MinecraftAccount }) {
        const existingVote = await VoteModel.findOne({ minecraftUser: minecraftAccount.uuid }).exec();
        if (existingVote) return messages.whitelist.request.existingVote;
        const voteChannel = await channels.whitelistChannel(this.client);
        const voteMessage = await voteChannel.send(messages.whitelist.request.voteEmbed(minecraftAccount, msg.author));
        await voteMessage.react('✅');
        await voteMessage.react('❌');
        const entry = await VoteModel.create({
            discordUser: msg.author.id,
            discordMessage: voteMessage.id,
            minecraftUser: minecraftAccount.uuid,
            dateExpired: Date.now() + expirationTimes.DAY_MS
        });
        await entry.save().catch(() => voteMessage.delete());
    }

}