import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import BotClientOptions from './BotClientOptions';
import { join } from 'path';

export default class BotClient extends AkairoClient {
    
    config: BotClientOptions;
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

        this.commandHandler = new CommandHandler(this, {
            directory: join(__dirname, '..', 'commands'),
            prefix: '!'
        });

        this.eventListener = new ListenerHandler(this, {
            directory: join(__dirname, '..', 'listeners')
        });

        this.commandHandler.useListenerHandler(this.eventListener);

        this.commandHandler.loadAll();
        this.eventListener.loadAll();

    }
}