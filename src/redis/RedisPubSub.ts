import { RedisClient, createClient } from "redis";

export default class RedisPubSub {

    host: string;
    port: number;
    publisherClient: RedisClient;
    subscriberClient: RedisClient;

    constructor(host: string, port: number) {
        this.host = host;
        this.port = port;
        this.publisherClient = createClient({ host: this.host, port: this.port });
        this.subscriberClient = createClient({ host: this.host, port: this.port });
    }

}