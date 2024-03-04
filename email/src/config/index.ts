import dotenv from 'dotenv'
dotenv.config();

export const config = {
    PORT: process.env.PORT,
    MESSAGE_QUEUE_URL: process.env.MESSAGE_QUEUE_URL,
    CHANNEL_NAME: 'MICRO',
    CUSTOMER_SERVICE: 'CUSTOMER_SERVICE',
    EMAIL_SERVICE: 'EMAIL_SERVICE'
}