import express, {Express} from "express";
import {routes} from "./routes";


function expressApp (app: Express) {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use('/', routes);
}

export {
    expressApp
}