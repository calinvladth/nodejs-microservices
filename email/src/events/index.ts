import amqplib, {Channel} from "amqplib";
import {config} from "../config";

async function createChannel() {
    const connection = await amqplib.connect('amqp://rabbitmq:5672');
    const channel = await connection.createChannel();
    await channel.assertQueue(config.CHANNEL_NAME,{ durable: true })
    return channel
}

async function publishMessage({channel, service, message}: {channel: Channel, service: string, message: string}) {
    channel.publish(config.CHANNEL_NAME, service, Buffer.from(message));
    console.log("Sent: ", message);
}

async function subscribeMessage({channel, service}: {channel: Channel, service: any}) {
    await channel.assertExchange(config.CHANNEL_NAME, "direct", { durable: true });
    const q = await channel.assertQueue("", { exclusive: true });
    console.log(` Waiting for messages in queue: ${q.queue}`);

    await channel.bindQueue(q.queue, config.CHANNEL_NAME, config.CUSTOMER_SERVICE);

    await channel.consume(
        q.queue,
        (message) => {
            if (message?.content) {
                console.log("the message is:", message.content.toString());
                service.SubscribeEvents(message.content.toString());
            }
            console.log("[X] received");
        },
        {
            noAck: true,
        }
    );

}

export const events = {
    createChannel
}