import {database} from "../database";

export interface PicksInterface {
    id: string
    name: string,
    category: string,
    lat: number,
    lng: number,
    text: string
    map_id: string,
    user_id: string
}

export async function Picks() {
    await database.query(`CREATE TABLE IF NOT EXISTS picks (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            category VARCHAR(255),
            lat DOUBLE PRECISION,
            lng DOUBLE PRECISION,
            text TEXT, 
            map_id SERIAL REFERENCES maps(id) ON DELETE CASCADE,
            user_id SERIAL NOT NULL
        )`);
}

export async function getPicks(map_id: string) {
    const {rows} = await database.query(`
            SELECT * FROM picks 
            WHERE map_id = '${map_id}';
        `)

    return rows
}

export async function getPickById({map_id, pickId}: {map_id: string, pickId: string}) {
    const {rows} = await database.query(`
            SELECT * FROM picks 
            WHERE map_id = '${map_id}' AND id = '${pickId}';
        `)

    return rows[0]
}


export async function getCategories(map_id: string) {
    const {rows} = await database.query(`
            SELECT DISTINCT category
            FROM picks
            WHERE map_id = ${map_id};
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

async function createPick({pick, user_id}: {pick: PicksInterface, user_id: string}) {
    const {category, name, lat, lng, text, map_id} = pick
    const {rows} = await database.query(`
            INSERT INTO picks (category, name, lat, lng, text, map_id, user_id)
            VALUES ('${category}', '${name}', ${lat}, ${lng}, '${text}', '${map_id}', '${user_id}')
            RETURNING *;
        `)

    return rows
}

async function editPick(pick: PicksInterface) {
    const {id, category, name, lat, lng, text, map_id} = pick
    const {rows} = await database.query(`
            UPDATE picks SET
            category = '${category}',
            name = '${name}',
            lat = '${lat}',
            lng = '${lng}',
            text = '${text}'
            WHERE id = ${id} 
            AND map_id = ${map_id}
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