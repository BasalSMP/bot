import MinecraftAccount from "../MinecraftAccount";
import { WhitelistedUserModel } from "../../models/WhitelistedUser";

export default class WhitelistAddition {

    discordUser: string;
    minecraftUser: MinecraftAccount;

    constructor(discordUser: string, minecraftUser: MinecraftAccount) {
        this.discordUser = discordUser;
        this.minecraftUser = minecraftUser;
    }

    async exec() {
        const whitelistedUser = await WhitelistedUserModel.create({
            discordUser: this.discordUser,
            minecraftUser: this.minecraftUser.uuid
        });
        await whitelistedUser.save();
    }

}