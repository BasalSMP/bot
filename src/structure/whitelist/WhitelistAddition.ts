import MinecraftAccount from "../MinecraftAccount";
import { WhitelistedUserModel } from "../../models/WhitelistedUser";
import { GuildMember } from "discord.js";
import { roles } from "../../constants/guild/roles";
import BotClient from "../../client/BotClient";

export default class WhitelistAddition {

    client: BotClient;
    discordUser: GuildMember;
    minecraftUser: MinecraftAccount;

    constructor(client: BotClient, discordUser: GuildMember, minecraftUser: MinecraftAccount) {
        this.client = client;
        this.discordUser = discordUser;
        this.minecraftUser = minecraftUser;
    }

    async userAlreadyWhitelisted() {
        let whitelisted = false;
        const whitelistedUser = await WhitelistedUserModel.findOne({ minecraftUser: this.minecraftUser.uuid }).exec();
        if (whitelistedUser) whitelisted = true;
        return whitelisted;
    }

    async exec() {
        if (!this.userAlreadyWhitelisted()) {
            const whitelistedUser = await WhitelistedUserModel.create({
                discordUser: this.discordUser.id,
                minecraftUser: this.minecraftUser.uuid
            });
            await whitelistedUser.save();
            const whitelistedRole = await roles.whitelistedRole(this.client);
            await this.discordUser.roles.add(whitelistedRole!);    
        }
    }

}