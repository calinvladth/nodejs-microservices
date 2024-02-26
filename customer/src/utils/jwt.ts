import {UserInterface} from "../models/users";
import jwt from "jsonwebtoken";
import {config} from "../config";

export async function generateToken(data: UserInterface) {
    return jwt.sign({
        data: data
    }, config.JWT_SECRET as string, {expiresIn: '1h'})
}

export async function verifyToken(token: string) {
    const {data} = jwt.verify(token, config.JWT_SECRET as string) as {data: UserInterface}
    return data
}