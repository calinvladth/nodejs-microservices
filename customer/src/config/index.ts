import dotenv from 'dotenv'
import * as fs from "fs";
dotenv.config();

function readTextFromFile(file: string | undefined) {
    if (!file) {
        throw Error('File is missing')
    }

    return fs.readFileSync(file, 'utf8')
}

export const config = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    DB_HOST: process.env.DB_HOST,
    DB_USER:  process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE:  process.env.DB_DATABASE,
    MESSAGE_QUEUE_URL: process.env.MESSAGE_QUEUE_URL,
    CHANNEL_NAME: 'MICRO',
    CUSTOMER_SERVICE: 'CUSTOMER_SERVICE',
    EMAIL_SERVICE: 'EMAIL_SERVICE'
}