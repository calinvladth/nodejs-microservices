import dotenv from 'dotenv'
import fs from "fs";
dotenv.config();

function readTextFromFile(file: string | undefined) {
    if (!file) {
        throw Error('File is missing')
    }

    return fs.readFileSync(file, 'utf8')
}

export const config = {
    PORT: process.env.PORT,
    MESSAGE_QUEUE_URL: process.env.MESSAGE_QUEUE_URL,
    SMTP_SERVICE: process.env.SMTP_SERVICE,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_SECURE: process.env.SMTP_SECURE === 'true',
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    CHANNEL_NAME: 'MICRO',
    CUSTOMER_SERVICE: 'CUSTOMER_SERVICE',
    EMAIL_SERVICE: 'EMAIL_SERVICE'
}