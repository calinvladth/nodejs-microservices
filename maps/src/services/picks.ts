import {Request, Response} from 'express'
import {models} from "../models";

async function get(req: Request, res: Response) {
    try {
        const picks = await models.picksQueries.getPicks(req.params.mapId)
        res.send(picks)
    } catch (err) {
        res.send(err)
    }
}

async function getById(req: Request, res: Response) {
    try {
        const picks = await models.picksQueries.getPickById({mapId: req.params.mapId, pickId: req.params.pickId})
        res.send(picks)
    } catch (err) {
        res.send(err)
    }
}


async function create(req: Request, res: Response) {
    try {
        const pick = await models.picksQueries.createPick({...req.body, mapId: req.params.mapId})
        res.send(pick)
    } catch (err) {
        res.send(err)
    }
}

async function update(req: Request, res: Response) {
    try {
        const pick = models.picksQueries.editPick({...req.body, id: req.params.pickId, mapId: req.params.mapId})
        res.send(pick)
    } catch (err) {
        res.send(err)
    }
}

async function remove(req: Request, res: Response) {
    try {
        const pick = await models.picksQueries.removePick(req.params.pickId)
        res.send(pick)
    } catch (err) {
        res.send(err)
    }
}

export const picks = {
    get,
    getById,
    create,
    update,
    remove
}