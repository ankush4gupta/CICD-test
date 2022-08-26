const mongoose = require("mongoose");

const Postschema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userID: { type: String, required: true }

});

module.exports = mongoose.model("Post", Postschema);
