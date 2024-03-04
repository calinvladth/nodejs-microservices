import amqplib, {Channel} from "amqplib";
import {config} from "../config";
import {EVENT_TYPES} from "./constants";

async function createChannel({channelName}: {channelName: string}) {
    const connection = await amqplib.connect(config.MESSAGE_QUEUE_URL as string);
    const channel = await connection.createChannel();
    await channel.assertQueue(config.CHANNEL_NAME,{ durable: true })
    return channel
}

async function publishMessage({channelName, message}: {channelName: string, message: {eventType: string, [key: string]: unknown}}) {
    const channel = await createChannel({channelName})

    channel.sendToQueue(channelName, Buffer.from(JSON.stringify(message)));
    console.log("Sent: ", message);
}

export const events = {
    publishMessage,
    EVENT_TYPES
}