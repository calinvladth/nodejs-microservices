import express, {Express} from "express";
import routes from "./routes";
import cors from "cors";


function expressApp (app: Express) {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    routes(app);
}

export {
    expressApp
}