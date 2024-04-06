import {Request, Response} from 'express'
import {database} from "../database";

async function get(req: Request, res: Response) {
    try {
        const {rows} =  await database.query('SELECT * FROM maps')
        res.send(rows)
    } catch (err) {
        res.send(err)
    }
}

async function getById(req: Request, res: Response) {
    try {
        const {rows} =  await database.query(`SELECT * FROM maps WHERE id = ${req.params.mapId}`)
        res.send(rows[0])
    } catch (err) {
        res.send(err)
    }
}

async function create(req: Request, res: Response) {
    try {
        const {name, lat, lng} = req.body
        const {rows} =  await database.query(`
            INSERT INTO maps (name, lat, lng)
            VALUES
            ('${name}', ${lat}, ${lng})
            RETURNING *
        `)
        res.send(rows)
    } catch (err) {
        res.send(err)
    }
}

async function update(req: Request, res: Response) {
    try {
        const {name, lat, lng} = req.body
        const {rows} = await database.query(`
            UPDATE maps SET
            name = '${name}',
            lat = '${lat}',
            lng = '${lng}'
            WHERE id = ${req.params.mapId}
            RETURNING *
        `)
        res.send(rows)
    } catch (err) {
        res.send(err)
    }
}

async function remove(req: Request, res: Response) {
    try {
        const {rows} = await database.query(`
            DELETE FROM maps WHERE id = ${req.params.mapId} 
            RETURNING *
        `)
        res.send(rows)
    } catch (err) {
        res.send(err)
    }
}

export const maps = {
    get,
    getById,
    create,
    update,
    remove
}