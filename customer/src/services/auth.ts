import {Request, Response} from 'express'
import {generateToken} from "../utils/jwt";
import {checkTextHash, hashText} from "../utils/hash-password";
import {database} from "../database";

async function signUp(req: Request, res: Response) {
    try {
        const {username, email, password} = req.body

        const {rows} = await database.query(`INSERT INTO users (username, email, password)
                VALUES
                ($1, $2, $3)
                RETURNING *
    `, [username, email, await hashText(password)])

        const token = await generateToken(rows[0])

        // await events.publishMessage({
        //     channelName: config.CHANNEL_NAME,
        //     message: {eventType: events.EVENT_TYPES.SIGNUP, data: {email}}
        // })

        res.send({email, username, token})
    } catch (err: unknown) {
        // @ts-ignore
        if (err.constraint) {
            res.status(403).send('User already exists')
        } else {
            res.status(400).send('Bad request')
        }
    }
}

async function signIn(req: Request, res: Response) {
    try {
        const {email, username, password} = req.body
        const {rows} = await database.query('SELECT * FROM users WHERE email=$1 OR username=$2', [email, username])

        await checkTextHash(password, rows[0].password)

        const token = await generateToken(rows[0])

        // TODO: Only for testing purposes
        // await events.publishMessage({
        //     channelName: config.CHANNEL_NAME,
        //     message: {eventType: events.EVENT_TYPES.SIGNIN, data: {email}}
        // })

        res.send({email, username, token})
    } catch (err) {
        res.status(400).send('Bad request')
    }
}

async function checkProtection(req: Request, res: Response) {
    try {
        const {email, username, password} = res.locals.user
        res.send({email, username, password})
    } catch (err) {
        res.status(401).send('Restricted access')
    }
}

export const auth = {
    signUp,
    signIn,
    checkProtection
}