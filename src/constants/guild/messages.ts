import { User } from "discord.js";
import { MessageEmbed } from "discord.js";
import MinecraftAccount from "../../structure/MinecraftAccount";

export const messages = {
    whitelist: {
        request: {
            prompt: {
                start: (author: User) => `${author} who would you like to request?`,
                retry: (author: User) => `${author} invalid Minecraft username, please try again!`
            },
            existingVote: '❌ There is already an ongoing vote with that user.',
            exitingWhitelist: '❌ That user is already whitelisted.',
            voteEmbed: (account: MinecraftAccount, author: User) => {
                const embed = new MessageEmbed()
                    .setDescription(`${author} is requesting someone to be whitelisted!`)
                    .addField('Minecraft Username', account.name)
                    .setThumbnail(account.getCrafatar())
                    .setColor('GOLD');
                return embed;
            },
            successMessage: (account: MinecraftAccount) => `✅ Successfully requested **${account.name}** to be whitelisted!`
        }
    },
    util: {
        ping: {
            pingingMessage: '🕐 Pinging...',
            pingOutput: (ping: number) => `✅ **Pong!** Heartbeat: \`${ping}ms\``
        }
    }
}