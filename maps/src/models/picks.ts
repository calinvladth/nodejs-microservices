import {database} from "../database";

export interface PicksInterface {
    id: string
    name: string,
    category: string,
    lat: number,
    lng: number,
    text: string
    mapId: string
}

export async function Picks() {
    await database.query(`CREATE TABLE IF NOT EXISTS picks (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            category VARCHAR(255),
            lat DOUBLE PRECISION,
            lng DOUBLE PRECISION,
            text TEXT,
            mapId SERIAL REFERENCES maps(id) ON DELETE CASCADE
        )`);
}

export async function getPicks(mapId: string) {
    const {rows} = await database.query(`
            SELECT * FROM picks 
            WHERE mapId = '${mapId}';
        `)

    return rows
}

export async function getPickById({mapId, pickId}: {mapId: string, pickId: string}) {
    const {rows} = await database.query(`
            SELECT * FROM picks 
            WHERE mapId = '${mapId}' AND id = '${pickId}';
        `)

    return rows[0]
}


export async function getCategories(mapId: string) {
    const {rows} = await database.query(`
            SELECT DISTINCT category
            FROM picks
            WHERE mapId = ${mapId};
        `)

    return rows
}

export async function getPicksByCategory(category: string) {
    const {rows} = await database.query(`
        SELECT * FROM PICKS 
        WHERE category = '${category}'
        ORDER BY name DESC;
    `)
    return rows
}

async function createPick(pick: PicksInterface) {
    const {category, name, lat, lng, text, mapId} = pick
    const {rows} = await database.query(`
            INSERT INTO picks (category, name, lat, lng, text, mapId)
            VALUES ('${category}', '${name}', ${lat}, ${lng}, '${text}', '${mapId}')
            RETURNING *;
        `)

    return rows
}

async function editPick(pick: PicksInterface) {
    const {id, category, name, lat, lng, text, mapId} = pick
    const {rows} = await database.query(`
            UPDATE picks SET
            category = '${category}',
            name = '${name}',
            lat = '${lat}',
            lng = '${lng}',
            text = '${text}'
            WHERE id = ${id} 
            AND mapId = ${mapId}
            RETURNING *;
        `)

    return rows
}

async function removePick(id: string) {
    const {rows} = await database.query(`
            DELETE FROM picks WHERE id = ${id}
            RETURNING *;
        `)

    return rows
}

export const picksQueries = {
    getPicks,
    getPickById,
    getCategories,
    getPicksByCategory,
    createPick,
    editPick,
    removePick
}