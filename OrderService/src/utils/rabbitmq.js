const {insertOrder} = require("../services/order.service")

const amqp = require('amqplib');
const exchange = "exchange"
async function Rabbitconnect(queueName) {
    // connecting to the server
    const amqpServer = 'amqp://localhost';
    const connection = await amqp.connect(amqpServer);

    // creating channel
    channel = await connection.createChannel();

    // creating queue
    channel.assertQueue(queueName, { durable: false });
    channel.prefetch(1);
    channel.bindQueue(queueName, exchange);
    console.log('Awaiting requests');

    // reading data from queue
     channel.consume(
         queueName,
        msg => {

            if (!msg) {
                throw "Error in msg format";
            }
            let somedata = JSON.parse(msg?.content.toString())

            // inserting received data to the db
            let datainserted= insertOrder(somedata);
            
            // sending response back 
            datainserted.then((dat)=>{
                channel.sendToQueue(msg?.properties.replyTo, Buffer.from(JSON.stringify(dat)));
            }
            )
            
            channel.ack(msg);

        }
    );
}


module.exports = Rabbitconnect
