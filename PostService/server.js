const app = require("./index");
const connect = require("./configs/db");
const Receiver = require("./Rabbitmq/Receive")

app.listen("3010", async () => {
    try {
        await connect();
        // Receiver()
        console.log("listening on port 3010 to run blog service")
    } catch (error) {
        console.log("error", error.message)
    }
})