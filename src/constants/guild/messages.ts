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
            existingVote: ':x: There is already an ongoing vote with that user.',
            voteEmbed: (account: MinecraftAccount, author: User) => {
                const embed = new MessageEmbed()
                    .setDescription(`${author} is requesting someone to be whitelisted!`)
                    .addField('Minecraft Username', account.name)
                    .setThumbnail(account.getCrafatar())
                    .setColor('GOLD');
                return embed;
            }
        }
    }
}