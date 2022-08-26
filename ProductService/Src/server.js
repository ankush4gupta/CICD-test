const connect = require("./configs/db");
const app = require("./index");

//  running server
app.listen("3011", async () => {
    try {
        await connect();
        console.log("listening on port 3011 Product Service")

    } catch (error) {
        console.log("error", error.message)
    }
})