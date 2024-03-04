import express, {Express} from 'express'
import {database} from  "./database";
import {expressApp} from "./express-app";
import {config} from "./config";
import {events} from "./events";


async function main() {
    const app: Express = express();
    await database.dbConnect()

    expressApp(app);

    app.listen(config.PORT, () => {
        console.log(`listening to port ${config.PORT}`);
    })
        .on('error', (err) => {
            console.log(err);
            process.exit();
        })
        .on('close', async () => {
            await database.dbDisconnect();
        })
}

main()