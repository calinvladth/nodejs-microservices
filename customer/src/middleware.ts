import {NextFunction, Request, Response} from 'express'
import {verifyToken} from "./utils/jwt";

export async function verifyTokenController (req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header('Bearer') as string
        res.locals.user = await verifyToken(token)

        next()
    } catch {
        res.status(401).send('Invalid token')
    }
}

export const middleware = {
    verifyTokenController
}