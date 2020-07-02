import BotClient from "../../client/BotClient";
import { GuildMember } from "discord.js";
import MinecraftAccount from "../MinecraftAccount";
import { WhitelistedUserModel } from "../../models/WhitelistedUser";

export default class WhitelistAlteration {

    client: BotClient;
    discordUser: GuildMember;
    minecraftUser: MinecraftAccount;

    constructor(client: BotClient, discordUser: GuildMember, minecraftUser: MinecraftAccount) {
        this.client = client;
        this.discordUser = discordUser;
        this.minecraftUser = minecraftUser;
    }

    async accountWhitelisted() {
        let whitelisted = false;
        const whitelistedUser = await WhitelistedUserModel.findOne({ minecraftUser: this.minecraftUser.uuid }).exec();
        if (whitelistedUser) whitelisted = true;
        return whitelisted;
    }

}