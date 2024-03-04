import amqplib, {ConsumeMessage} from "amqplib";
import {config} from "../config";
import {EVENT_TYPES} from "./constants";

async function createChannel({channelName}: {channelName: string}) {
    const connection = await amqplib.connect(config.MESSAGE_QUEUE_URL as string);
    const channel = await connection.createChannel();
    await channel.assertQueue(channelName,{ durable: true })
    return channel
}

async function listenMessages({channelName}: {channelName: string}) {
    const channel = await createChannel({channelName})

    await channel.consume(channelName, (message: ConsumeMessage | null) => {
        if (message !== null) {
            const parsedMessage: {eventType: string} = JSON.parse(message.content.toString())
            handleEvents(parsedMessage)
            channel.ack(message);
        } else {
            console.log('Consumer cancelled by server');
        }
    });
}

function handleEvents(message: {eventType: string, [key: string]: unknown}) {
    switch (message.eventType) {
        case EVENT_TYPES.SIGNUP:
            console.log('Handle email for signup ', message)
            break

        case EVENT_TYPES.SIGNIN:
            console.log('Handle email for signin ', message)
            break

        case EVENT_TYPES.FORGOT:
            console.log('Handle email for forgot')
            break

        case EVENT_TYPES.RESET:
            console.log('Handle email for reset')
            break
    }
}



export const events = {
    listenMessages,
    EVENT_TYPES
}