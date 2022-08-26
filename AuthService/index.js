const express = require("express");
const  connect  = require("./configs/db");
const app = express();
const { register, login } = require("./Authentication/Auth");
const usercontroller = require("./controller/user.controller")
app.use(express.json());

app.use("/user", usercontroller)
app.post("/register", register);
app.post("/login", login);

app.listen("3009", async() => {
    await connect();
    console.log("listening on port 3009 to run auth service");

})