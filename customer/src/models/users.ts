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
