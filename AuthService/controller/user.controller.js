
const express = require("express");

const router = express.Router();
const User =  require("../models/user.model")

router.get("/", async (req, res) => {
    try {
        let user = await User.find().lean().exec();
        return res.send(user);
    } catch (error) {
        return res.status(501).send("error", error.message)
    }
})
module.exports = router