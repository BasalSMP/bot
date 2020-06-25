import { prop, getModelForClass } from "@typegoose/typegoose";

class Vote {
    @prop({ required: true })
    public discordUser!: string;

    @prop({ required: true })
    public discordMessage!: string;

    @prop({ required: true })
    public minecraftUser!: string;

    @prop({ required: true })
    public dateExpired!: Date;
}

const VoteModel = getModelForClass(Vote);
export { Vote, VoteModel }