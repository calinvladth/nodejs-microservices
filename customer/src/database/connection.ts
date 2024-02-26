// TODO: Handle db from here
import {Pool} from 'pg'
import {models} from "../models";

const pool = new Pool({
    host: '192.168.68.10',
    user: 'postgres',
    password: '1q2w3e',
    database: 'auth',
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

