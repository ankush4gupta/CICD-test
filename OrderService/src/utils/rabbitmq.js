const {insertOrder} = require("../services/order.service")

const amqp = require('amqplib');
const exchange = "exchange"
async function Rabbitconnect() {
    const amqpServer = 'amqp://localhost';
    const connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    channel.assertQueue("Buy_Product", { durable: false });
    channel.prefetch(1);
    channel.bindQueue("Buy_Product", exchange);
    console.log('Awaiting requests');

     channel.consume(
        "Buy_Product",
        msg => {

            if (!msg) {
                throw "Error in msg format";
            }

            // console.log("message",msg)
            let somedata = JSON.parse(msg?.content.toString())
            // console.log("somedata",somedata)
            // console.log(msg)
            // let data = JSON.parse(msg?.content.toString());
           
            let datainserted= insertOrder(somedata);

            datainserted.then((dat)=>{
                console.log(dat)
                channel.sendToQueue(msg?.properties.replyTo, Buffer.from(JSON.stringify(dat)), {
                    // correlationId: msg?.properties.correlationId,
                });
            }
            )
            
            channel.ack(msg);

        }
    );



}


module.exports = Rabbitconnect
