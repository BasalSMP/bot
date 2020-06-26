import { AkairoClient } from 'discord-akairo';
import { TextChannel } from 'discord.js';

export const channels = {
    whitelistChannel: async (client: AkairoClient) => await client.channels.fetch('725521497963364383') as TextChannel 
}