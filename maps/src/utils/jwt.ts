import jwt from "jsonwebtoken";
import {config} from "../config";
import {UserInterface} from "./types";

export async function verifyToken(token: string) {
    const {data} = jwt.verify(token, config.JWT_SECRET as string) as {data: UserInterface}
    return data
}