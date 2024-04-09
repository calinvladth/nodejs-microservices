import {database} from "../database";

export interface MapsInterface {
    id: string
    name: string,
    lat: number,
    lng: number,
    userId: string,
    startingPosition: string
}

export async function Maps() {
    await database.query(`CREATE TABLE IF NOT EXISTS maps (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            lat DOUBLE PRECISION,
            lng DOUBLE PRECISION,
            userId TEXT NOT NULL
        )`);
}

async function getMaps(userId: string) {
    const {rows} = await database.query(`
            SELECT * FROM maps
            WHERE userId = '${userId}'
        `)

    return rows
}

async function getMapById(mapId: string) {
    const {rows} = await database.query(`
            SELECT * FROM maps
            WHERE id = ${mapId}
        `)

    return rows[0]
}

async function createMap({map, userId}: { map: MapsInterface, userId: string }) {
    const {rows} = await database.query(`
            INSERT INTO maps (name, lat, lng, userId)
            VALUES
            ('${map.name}', ${map.lat}, ${map.lng}, '${userId}')
            RETURNING *
        `)

    return rows
}

async function editMap(map: MapsInterface) {
    const {rows} = await database.query(`
            UPDATE maps SET
            name = '${map.name}',
            lat = '${map.lat}',
            lng = '${map.lng}'
            WHERE id = ${map.id}
            RETURNING *
        `)

    return rows
}

async function removeMap(mapId: string) {
    const {rows} = await database.query(`
            DELETE FROM maps WHERE id = ${mapId} 
            RETURNING *
        `)

    return rows
}

export const mapsQueries = {getMaps, getMapById, createMap, editMap, removeMap}
