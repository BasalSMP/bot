import BotClient from "../../client/BotClient";
import { Vote, VoteModel } from "../../models/Vote";
import { expirationTimes } from "../../constants/expirationTimes";

export default class VoteScheduler {
    
    client: BotClient;
    private timeouts: Map<NodeJS.Timeout, Vote>

    constructor(client: BotClient) {
        this.client = client;
        this.timeouts = new Map();
    }

    async refresh() {
        this.timeouts.forEach((v, k) => this.timeouts.delete(k));
        const votesExpiring = await VoteModel.find({
            dateExpired: { $lte: new Date(Date.now() + expirationTimes.DAY_MS) }
        }).exec();
        votesExpiring.forEach(async vote => {
            const timeout = setTimeout(() => {
                this.expireVote();
            }, vote.dateExpired.getTime() - Date.now());
            this.timeouts.set(timeout, vote);
        });
        setTimeout(() => this.refresh, expirationTimes.HALF_DAY_MS);
    }

    expireVote() {
        // TODO: eval vote and make decision to whitelist or not
    }

}