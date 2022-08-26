const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    productName: { type: String, required: true },
    rate: { type: Number, required: true }
})

module.exports = mongoose.model("product", productSchema);