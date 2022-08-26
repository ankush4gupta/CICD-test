const express = require("express");
const productRoutes = require("./routes/productRouter")
//Initialise server variable
const app = express();

//Content-Type application/json
app.use(express.json());

//Define API routes for product service
app.use("/product", productRoutes);

module.exports = app;

