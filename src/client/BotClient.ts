import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import BotClientOptions from './BotClientOptions';
import { join } from 'path';
import MinecraftAccount from '../structure/MinecraftAccount';
import VoteScheduler from '../structure/votes/VoteScheduler';

export default class BotClient extends AkairoClient {
    
    config: BotClientOptions;
    voteScheduler: VoteScheduler;
    commandHandler: CommandHandler;
    eventListener: ListenerHandler;
    
    constructor(config: BotClientOptions) {
        super(
            {
                ownerID: config.owners
            },
            {
                disableMentions: 'everyone'
            }
        )

        this.config = config;

        this.voteScheduler = new VoteScheduler(this);

        this.commandHandler = new CommandHandler(this, {
            directory: join(__dirname, '..', 'commands'),
            prefix: '!',
            argumentDefaults: {
                prompt: {
                    timeout: ':x: Time ran out, command has been cancelled.',
                    ended: ':x: Too many retries, command has been cancelled.',
                    cancel: ':x: Command has been cancelled.',
                    retries: 4,
                    time: 30000
                }
            }
        });

        this.eventListener = new ListenerHandler(this, {
            directory: join(__dirname, '..', 'listeners')
        });

        this.commandHandler.useListenerHandler(this.eventListener);

        this.commandHandler.resolver.addType('minecraftAccount', async (msg, phrase) => {
            if (!phrase) return null;
            const account = await MinecraftAccount.fetchByName(phrase);
            if (!account) return null;
            return account;
        });

        this.commandHandler.loadAll();
        this.eventListener.loadAll();

    }
}

declare module 'discord-akairo' {
    interface AkairoClient {
        config: BotClientOptions;
        voteScheduler: VoteScheduler;
        commandHandler: CommandHandler;
        eventListener: ListenerHandler;
    }
}