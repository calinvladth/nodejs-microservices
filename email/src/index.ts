import express, {Express} from 'express'
import {expressApp} from "./express-app";
import {config} from "./config";


async function main() {
    const app: Express = express();

    expressApp(app);

    app.listen(config.PORT, () => {
        console.log(`listening to port ${config.PORT}`);
    })
        .on('error', (err) => {
            console.log(err);
            process.exit();
        })
}

main()