const connect = require("./configs/db");
const app = require("./index");

//  running server
app.listen("3012", async () => {
    try {
        await connect();
        console.log("listening on port 3012 order Service")

    } catch (error) {
        console.log("error", error.message)
    }
})