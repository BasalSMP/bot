import { Command } from "discord-akairo";
import { Message } from "discord.js";
import MinecraftAccount from "../../structure/MinecraftAccount";
import { messages } from "../../constants/guild/messages";
import { VoteModel } from "../../models/Vote";
import { expirationTimes } from "../../constants/expirationTimes";
import { channels } from "../../constants/guild/channels";

export default class RequestWhitelistCommand extends Command {
    constructor() {
        super('request', {
            aliases: ['request'],
            args: [
                {
                    id: 'minecraftAccount',
                    type: 'minecraftAccount',
                    prompt: {
                        start: (msg: Message) => messages.whitelist.request.prompt.start(msg.author),
                        retry: (msg: Message) => messages.whitelist.request.prompt.retry(msg.author)
                    }
                }
            ]
        });
    }

    async exec(msg: Message, { minecraftAccount }: { minecraftAccount: MinecraftAccount }) {
        const existingVote = await VoteModel.findOne({ minecraftUser: minecraftAccount.uuid }).exec();
        if (existingVote) return msg.channel.send(messages.whitelist.request.existingVote);
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
        msg.channel.send(messages.whitelist.request.successMessage(minecraftAccount));
    }

}