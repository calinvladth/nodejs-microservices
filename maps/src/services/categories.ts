import {Request, Response} from "express";
import {models} from "../models";

async function get(req: Request, res: Response) {
    try {
        const categoriesList = await models.picksQueries.getCategories(req.params.id)
        const picksOnCategories = await Promise.all(categoriesList.map(async obj => ({
            category: obj.category,
            picks: await models.picksQueries.getPicksByCategory(obj.category)
        })))

        res.send(picksOnCategories)

    } catch (err) {
        res.send(err)
    }
}

export const categories = {
    get
}