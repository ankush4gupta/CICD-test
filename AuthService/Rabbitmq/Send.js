var amqp = require('amqplib/callback_api');

module.exports = (msg)=>{
    // setting up connection
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            queue_name = 'auth_queue';
            // msg = 'Ankush Gupta';

            channel.assertQueue(queue_name, {
                durable: false
            });
            channel.sendToQueue(queue_name, Buffer.from(msg));

            console.log(" [x] pushing message to the auth queue %s", msg);
        });
        // setTimeout(function () {
        //     connection.close();
        //     process.exit(0);
        // }, 500);
    });
}

