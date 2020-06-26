import { prop, getModelForClass } from "@typegoose/typegoose";

class WhitelistedUser {
    @prop({ required: true })
    public discordUser!: string;

    @prop({ required: true })
    public minecraftUser!: string;
}

export const WhitelistedUserModel = getModelForClass(WhitelistedUser);