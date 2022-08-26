const express = require("express");
const app = express();
const cors = require("cors");
const proxy = require("express-http-proxy")
app.use(cors())

app.use("/auth", proxy("http://localhost:3009"))
app.use("/blog", proxy("http://localhost:3010"))
app.use("/productService", proxy("http://localhost:3011"))
app.use("/orderService", proxy("http://localhost:3012"))

app.use("/", proxy("https://mytheresa.herokuapp.com/"))


app.use(express.json());
app.listen("3008", () => {
    console.log("listening on port 3008 to run api gateway")
})