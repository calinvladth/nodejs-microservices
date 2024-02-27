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
        res.send({token})
    } catch (err) {
        res.send(err)
    }
}

async function signIn(req: Request, res: Response) {
    try {
        const {email, username, password} = req.body
        const {rows} = await database.query('SELECT * FROM users WHERE email=$1 OR username=$2', [email, username])
        await checkTextHash(password, rows[0].password)
        const token = await generateToken(rows[0])
        res.send(token)
    } catch (err) {
        res.send(err)
    }
}

async function checkProtection(req: Request, res: Response) {
    res.send({user: res.locals.user})
}

export const auth = {
    signUp,
    signIn,
    checkProtection
}