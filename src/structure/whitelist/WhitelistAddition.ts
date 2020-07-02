import MinecraftAccount from "../MinecraftAccount";
import { WhitelistedUserModel } from "../../models/WhitelistedUser";
import { GuildMember } from "discord.js";
import { roles } from "../../constants/guild/roles";
import BotClient from "../../client/BotClient";
import { redisClient } from "../../app";
import WhitelistAlteration from "./WhitelistAlteration";

export default class WhitelistAddition extends WhitelistAlteration {

    constructor(client: BotClient, discordUser: GuildMember, minecraftUser: MinecraftAccount) {
        super(client, discordUser, minecraftUser);
    }

    async exec() {
        if (!await this.accountWhitelisted()) {
            const whitelistedUser = await WhitelistedUserModel.create({
                discordUser: this.discordUser.id,
                minecraftUser: this.minecraftUser.uuid
            });
            await whitelistedUser.save();
            redisClient.publish('whitelistAddition', this.minecraftUser.uuid);
            const whitelistedRole = await roles.whitelistedRole(this.client);
            await this.discordUser.roles.add(whitelistedRole!);    
        }
    }

}