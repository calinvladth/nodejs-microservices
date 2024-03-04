import dotenv from 'dotenv'
dotenv.config();

export const config = {
    PORT: process.env.PORT,
    CHANNEL_NAME: 'MICRO',
    CUSTOMER_SERVICE: 'CUSTOMER_SERVICE'
}