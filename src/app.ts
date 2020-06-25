import BotClient from "./client/BotClient";
import { config } from 'dotenv';
import { mongoose } from '@typegoose/typegoose';

config();

(async() => {
    const client = new BotClient({
        owners: process.env.OWNER_IDS!.split(',')
    });

    const db = await mongoose.connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    client.login(process.env.BOT_TOKEN!);

})();