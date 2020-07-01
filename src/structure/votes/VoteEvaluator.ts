import { Vote } from "../../models/Vote";
import { channels } from "../../constants/guild/channels";
import BotClient from "../../client/BotClient";
import WhitelistAddition from "../whitelist/WhitelistAddition";
import MinecraftAccount from "../MinecraftAccount";
import guild from "../../constants/guild/guild";

export default class VoteEvaulator {
    
    client: BotClient;
    vote: Vote;
    
    constructor(client: BotClient, vote: Vote) {
        this.client = client;
        this.vote = vote;
    }

    async eval() {
        const voteChannel = await channels.whitelistChannel(this.client);
        const voteMessage = voteChannel.messages.resolve(this.vote.discordMessage);
        if (!voteMessage) return this.vote.settleVote(this.client)
        const acceptReaction = voteMessage.reactions.resolve('✅');
        const denyReaction = voteMessage.reactions.resolve('❌');
        if (acceptReaction && denyReaction) {
            const percentVoteYes = Math.round((acceptReaction.count! / (acceptReaction.count! + denyReaction.count!)) * 100);
            if (percentVoteYes >= 50) {
                // 50%+ of people voted yes
                const minecraftAccount = await MinecraftAccount.fetchByUUID(this.vote.minecraftUser);
                if (!minecraftAccount) return;
                const member = await guild(this.client)?.members.fetch(this.vote.discordUser);
                if (!member) return;
                const whitelistAddition = new WhitelistAddition(this.client, member, minecraftAccount);
                await whitelistAddition.exec();    
                this.vote.settleVote(this.client);
            } else {
                // 50%+ of people voted no
                this.vote.settleVote(this.client);
            }
        }
    }

}