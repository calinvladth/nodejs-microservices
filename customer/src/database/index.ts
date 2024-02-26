import {dbConnect, dbDisconnect, query} from "./connection";

export const database = {
    dbConnect,
    dbDisconnect,
    query
}