import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { channels } from "../constants/guild/channels";
import BotClient from "../client/BotClient";

@modelOptions({ schemaOptions: { collection: 'votes' } })
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
        const voteChannel = await channels.whitelistChannel(client);
        const voteMessage = voteChannel.messages.resolve(this.discordMessage);
        if (voteMessage) await voteMessage.delete();
        await VoteModel.deleteOne({ discordMessage: this.discordMessage }).exec();
    }

}

const VoteModel = getModelForClass(Vote);
export { Vote, VoteModel }