const express = require("express");
const orderRoute = require("./routes/order.route")
const Rabbitconnect = require("./utils/rabbitmq");
Rabbitconnect()
//Initialise server variable
const app = express();

//Content-Type application/json
app.use(express.json());

//Define API routes for product service
app.use("/order",orderRoute);

module.exports = app;

