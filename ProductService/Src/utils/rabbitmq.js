const amqp = require('amqplib');
const crypto = require('crypto');

let channel;
const exchange = "exchange"

async function Rabbitconnect(queueName,msg) {

    const amqpServer = 'amqp://localhost';
    // connecting to the RMQ
    const connection = await amqp.connect(amqpServer);
    // creating channel
    channel = await connection.createChannel();

    channel.assertExchange(exchange, 'direct', 
    {durable: false,});

    // creating callbackQueue for response
    let replyToQueue = "calltobackQueue"
    channel.assertQueue(replyToQueue, {
        durable: false
    })
    channel.consume(
        replyToQueue,
        msg => {
            if (!msg) {
                throw "Error in msg format";
            }
            console.log("getting response from orderService", msg.content.toString())
        }, {
        noAck: true
    }
    );


    message = await msg;
    // sending data to queue
    console.log("send this to order service",message)
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
            replyTo: replyToQueue,
        });
    
}


module.exports = Rabbitconnect

