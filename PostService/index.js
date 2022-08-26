const express = require("express");
const app = express();
const PostController = require("./controllers/post.controller");
const Receive = require("./Rabbitmq/Receive")
app.use(express.json());

(() => {
    Receive()
})();

app.get("/", (req, res) => {
    res.send("this is a post service on 3010, Ankush")
})

app.use("/api", PostController)

module.exports = app
