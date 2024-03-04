import express, {Express} from 'express'
import {expressApp} from "./express-app";
import {config} from "./config";
import {events} from "./events";


async function main() {
    const app: Express = express();

    expressApp(app);

    // Listen to events
    await events.listenMessages({channelName: config.CHANNEL_NAME})

    app.listen(config.PORT, () => {
        console.log(`listening to port ${config.PORT}`);
    })
        .on('error', (err) => {
            console.log(err);
            process.exit();
        })
}

main()