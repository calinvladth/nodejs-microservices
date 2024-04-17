import {NextFunction, Request, Response} from 'express'
import {verifyToken} from "../utils/jwt";
import {models} from "../models";

export async function verifyMapState (req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header('Bearer') as string
        const map = await models.mapsQueries.getMapById(req.params.map_id)

        if (!map.is_public) {
            await verifyToken(token)
        }

        res.locals.map = map
        next()

    } catch {
        res.status(401).send('Invalid token')
    }
}

export default verifyMapState