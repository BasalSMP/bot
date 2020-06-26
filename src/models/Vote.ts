import { prop, getModelForClass } from "@typegoose/typegoose";
import { channels } from "../constants/channels";
import BotClient from "../client/BotClient";

class Vote {
    @prop({ required: true })
    public discordUser!: string;

    @prop({ required: true })
    public discordMessage!: string;

    @prop({ required: true })
    public minecraftUser!: string;

    @prop({ required: true })
    public dateExpired!: Date;

    public async settleVote(client: BotClient) {
        const vote = await VoteModel.findOne({ discordMessage: this.discordMessage }).exec();
        const voteChannel = await channels.whitelistChannel(client);
        const voteMessage = await voteChannel.messages.fetch(this.discordMessage);
        await voteMessage.delete();
        await vote?.remove();
    }

}

const VoteModel = getModelForClass(Vote);
export { Vote, VoteModel }