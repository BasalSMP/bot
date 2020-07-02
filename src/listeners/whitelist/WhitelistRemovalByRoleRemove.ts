import { Listener } from "discord-akairo";
import { GuildMember } from "discord.js";
import { roles } from "../../constants/guild/roles";
import WhitelistRemoval from "../../structure/whitelist/WhitelistRemoval";
import { WhitelistedUserModel } from "../../models/WhitelistedUser";
import MinecraftAccount from "../../structure/MinecraftAccount";

export default class WhitelistRemovalByRoleRemoval extends Listener {
    constructor() {
        super('whitelistRemovalByRoleRemove', {
            emitter: 'client',
            event: 'guildMemberUpdate'
        });
    }

    async exec(oMember: GuildMember, nMember: GuildMember) {
        const whitelistedRole = await roles.whitelistedRole(this.client);
        if (oMember.roles.resolve(whitelistedRole!) && !nMember.roles.resolve(whitelistedRole!)) {
            const whitelistedUser = await WhitelistedUserModel.findOne({ discordUser: nMember.id }).exec();
            if (!whitelistedUser) return;
            const minecraftAccount = await MinecraftAccount.fetchByUUID(whitelistedUser.minecraftUser);
            if (!minecraftAccount) return;
            const whitelistRemoval = new WhitelistRemoval(this.client, nMember, minecraftAccount);
            await whitelistRemoval.exec();
        }
    }

}