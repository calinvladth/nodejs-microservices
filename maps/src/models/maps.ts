import {database} from "../database";
export interface MapsInterface {
    id: string
    name: string,
    lat: number,
    lng: number,
    startingPosition: string
}

export async function Maps() {
    await database.query(`CREATE TABLE IF NOT EXISTS maps (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            lat DOUBLE PRECISION,
            lng DOUBLE PRECISION
        )`);
}
