import {NextFunction, Request, Response} from 'express'
import {verifyToken} from "./utils/jwt";
import {userQueries} from "./models/users";

export async function verifyTokenController (req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header('Bearer') as string
        const tokenDecoded = await verifyToken(token)

        res.locals.user = await userQueries.getUser(tokenDecoded.id)

        next()
    } catch {
        res.status(401).send('Invalid token')
    }
}

export const middleware = {
    verifyTokenController
}