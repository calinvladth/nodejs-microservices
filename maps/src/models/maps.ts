import {database} from "../database";

export interface MapsInterface {
    id: string
    name: string,
    lat: number,
    lng: number,
    user_id: string,
    is_public: boolean
}

export async function Maps() {
    await database.query(`CREATE TABLE IF NOT EXISTS maps (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            lat DOUBLE PRECISION,
            lng DOUBLE PRECISION,
            is_public BOOLEAN DEFAULT FALSE,
            user_id SERIAL NOT NULL
        )`);
}

async function getMaps(user_id: string) {
    const {rows} = await database.query(`
            SELECT * FROM maps
            WHERE user_id = '${user_id}' 
        `)

    return rows
}

async function getMapById(map_id: string) {
    const {rows} = await database.query(`
            SELECT * FROM maps
            WHERE id = ${map_id}
        `)

    return rows[0]
}

async function createMap({map, user_id}: { map: MapsInterface, user_id: string }) {
    const {rows} = await database.query(`
            INSERT INTO maps (name, lat, lng, user_id)
            VALUES
            ('${map.name}', ${map.lat}, ${map.lng}, '${user_id}')
            RETURNING *
        `)

    return rows
}

async function editMap(map: MapsInterface) {
    const {rows} = await database.query(`
            UPDATE maps SET
            name = '${map.name}',
            lat = '${map.lat}',
            lng = '${map.lng}',
            is_public = ${map.is_public}
            WHERE id = ${map.id}
            RETURNING *
        `)

    return rows
}

async function removeMap(map_id: string) {
    const {rows} = await database.query(`
            DELETE FROM maps WHERE id = ${map_id} 
            RETURNING *
        `)

    return rows
}

export const mapsQueries = {getMaps, getMapById, createMap, editMap, removeMap}
