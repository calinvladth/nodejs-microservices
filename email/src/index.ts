import express, {Express} from 'express'
import {expressApp} from "./express-app";
import {config} from "./config";
import {events} from "./events";


async function main() {
    const app: Express = express();

    expressApp(app);

    // Listen to events
    const channel = await events.createChannel()
    await channel.assertQueue(config.CHANNEL_NAME)

    // Listener
    await channel.consume(config.CHANNEL_NAME, (msg) => {
        if (msg !== null) {
            console.log('Recieved:', JSON.parse(msg.content.toString()));
            channel.ack(msg);
        } else {
            console.log('Consumer cancelled by server');
        }
    });

    app.listen(config.PORT, () => {
        console.log(`listening to port ${config.PORT}`);
    })
        .on('error', (err) => {
            console.log(err);
            process.exit();
        })
}

main()