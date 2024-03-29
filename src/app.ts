import BotClient from "./client/BotClient";
import { config } from 'dotenv';
import { mongoose } from '@typegoose/typegoose';
import { createClient } from "redis";

config();

const client = new BotClient({
    owners: process.env.OWNER_IDS!.split(',')
}); 

export const redisClient = createClient({
    host: process.env.REDIS_HOST!,
    port: parseInt(process.env.REDIS_PORT!)
});

(async() => {
    const db = await mongoose.connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
})();

client.login(process.env.BOT_TOKEN!);