import { Vote } from "../../models/Vote";
import { channels } from "../../constants/channels";
import BotClient from "../../client/BotClient";

export default class VoteEvaulator {
    
    client: BotClient;
    vote: Vote;
    
    constructor(client: BotClient, vote: Vote) {
        this.client = client;
        this.vote = vote;
    }

    async eval() {
        const voteChannel = await channels.whitelistChannel(this.client);
        const voteMessage = await voteChannel.messages.fetch(this.vote.discordMessage);
        const acceptReaction = voteMessage.reactions.resolve('✅');
        const denyReaction = voteMessage.reactions.resolve('❌');
        if (acceptReaction && denyReaction) {
            const percentVoteYes = Math.round((acceptReaction.count! / (acceptReaction.count! + denyReaction.count!)) * 100);
            if (percentVoteYes >= 50) {
                // 50%+ of people voted yes
                // TODO: whitelist player and delete vote
            } else {
                // 50%+ of people voted no
                // TODO: simply delete vote
            }
        }
    }

}