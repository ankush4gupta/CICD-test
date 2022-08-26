const amqp = require('amqplib');
const crypto = require('crypto');


let channel;
const exchange = "exchange"

async function Rabbitconnect(msg) {
    // console.log("queuename",queueName)
    const amqpServer = 'amqp://localhost';
    const connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
channel.assertExchange(exchange, 'direct', {
    durable: false,
});

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
            console.log("msg", msg.content.toString())
            // if (msg?.properties.correlationId == crypto.randomUUID()) {
            //     console.log(' [.] Got %s', JSON.parse(msg.content.toString()));
            // }


        }, {
        noAck: true
    }
    );




// channel.assertQueue('', { exclusive: true }, (Err, q) => {
//     if (Err) {
//         throw Err;
//     }
//     console.log(q,"q")
//      let replyToQueue = q.queue;
//     channel.consume(
//         replyToQueue,
//         msg => {
//             if (!msg) {
//                 throw "Error in msg format";
//             }
//             console.log("msg",msg)
//             // if (msg?.properties.correlationId == crypto.randomUUID()) {
//             //     console.log(' [.] Got %s', JSON.parse(msg.content.toString()));
//             // }
            
           
//         }, {
//         noAck: true
//     }
//     );
// });





  
        console.log(msg,"sending msg")
    console.log("replyToQueue", replyToQueue)
        console.log('Produce message to RabbitMQ');
        message = await msg;
        console.log(message);
        channel.sendToQueue("Buy_Product", Buffer.from(JSON.stringify(message)), {
            // correlationId: crypto.randomUUID(),
            replyTo: replyToQueue,
        });
    
}


module.exports = Rabbitconnect


































//     await channel.assertQueue(queueName);



// }


// ***************************************





// const uuid = uuidvv4();

// const getFib = async () => {
//     try {
//         const connection = await amqplib.connect("amqp://localhost");

//         const channel = await connection.createChannel();
//         const q = await channel.assertQueue("", { exclusive: true }); //storing q variable
//         console.log(" [x] Requesting fib(%d)", num);

//         channel.sendToQueue("rpc_queue", Buffer.from(num.toString()), {
//             replyTo: q.queue, //what queue we are sending to---which queue
//             correlationId: uuid, //oru quil kore meass age kanum..so athilnn idenitify cheyyn
//         });

//         channel.consume(
//             q.queue,
//             (msg) => {
//                 if (msg.properties.correlationId == uuid) {
//                     console.log(" [.] Got %s", msg.content.toString());
//                     setTimeout(() => {
//                         connection.close();
//                         process.exit(0);
//                     }, 500);
//                 }
//             },
//             { noAck: true }
//         );
//     } catch (err) {
//         console.log(err);
//     }
// };

// getFib();