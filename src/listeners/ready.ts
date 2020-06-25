import { Listener } from "discord-akairo";

export default class ReadyEvent extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async exec() {
        console.log(`Ready on ${this.client.user!.tag}`);
        await this.client.voteScheduler.refresh();
    }
}