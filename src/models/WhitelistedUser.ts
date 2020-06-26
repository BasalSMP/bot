import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: 'whitelistedUsers' } })
class WhitelistedUser {
    @prop({ required: true })
    public discordUser!: string;

    @prop({ required: true })
    public minecraftUser!: string;
}

export const WhitelistedUserModel = getModelForClass(WhitelistedUser);