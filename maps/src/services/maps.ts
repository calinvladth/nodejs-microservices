import {Request, Response} from 'express'
import {models} from "../models";

async function get(req: Request, res: Response) {
    try {
        res.send(await models.mapsQueries.getMaps(res.locals.user.id))
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getById(req: Request, res: Response) {
    try {
        res.send(res.locals.map)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function create(req: Request, res: Response) {
    try {
        res.send(await models.mapsQueries.createMap({map: req.body, user_id: res.locals.user.id}))
    } catch (err) {
        res.status(500).send(err)
    }
}

async function update(req: Request, res: Response) {
    try {
        res.send(await models.mapsQueries.editMap({...req.body, id: req.params.map_id}))
    } catch (err) {
        res.status(500).send(err)
    }
}

async function remove(req: Request, res: Response) {
    try {
        res.send(await models.mapsQueries.removeMap(req.params.map_id))
    } catch (err) {
        res.status(500).send(err)
    }
}

export const maps = {
    get,
    getById,
    create,
    update,
    remove
}