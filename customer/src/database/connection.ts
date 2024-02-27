// TODO: Handle db from here
import {Pool} from 'pg'
import {models} from "../models";
import {config} from "../config";

const pool = new Pool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

export async function dbConnect() {
    try {
        await pool.connect()
        // pool.query('DROP TABLE IF EXISTS users;')
        await models.UsersModel()
        console.log('[database] Connected')
    } catch (err) {
        console.error('[database] Error')
        console.log(err)
    }
}

export async function dbDisconnect() {
    try {
        await pool.end()
    } catch (err) {
        console.error('[database] Error')
        console.log(err)
    }

}
export const query = (text: string, params?: any) => pool.query(text, params);

