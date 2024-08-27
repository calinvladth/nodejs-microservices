import {database} from "../database";

export interface UserInterface {
    email: string,
    username: string,
    id: string
}

export async function UsersModel() {
    await database.query(`CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255),
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )`);
}

export async function getUser(id: string) {
    const {rows} = await database.query(`
        SELECT * FROM users 
        WHERE id='${id}'
    `)

    const user = rows[0]

    if (!user) {
        throw new Error('Not a user')
    }

    return user
}

export const userQueries = {
    getUser
}