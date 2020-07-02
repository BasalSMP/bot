import WhitelistAlteration from "./WhitelistAlteration";
import BotClient from "../../client/BotClient";
import { GuildMember } from "discord.js";
import MinecraftAccount from "../MinecraftAccount";
import { WhitelistedUserModel } from "../../models/WhitelistedUser";
import { redisPubSub } from "../../app";

export default class WhitelistRemoval extends WhitelistAlteration {

    constructor(client: BotClient, discordUser: GuildMember, minecraftAccount: MinecraftAccount) {
        super(client, discordUser, minecraftAccount);
    }

    async exec() {
        if (await this.accountWhitelisted()) {
            await WhitelistedUserModel.deleteOne({ minecraftUser: this.minecraftUser.uuid }).exec();
            redisPubSub.publisherClient.publish('whitelistRemove', this.minecraftUser.uuid);
        }
    }

}