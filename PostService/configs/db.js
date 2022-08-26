const mongoose  = require("mongoose");
module.exports = () => {
    return mongoose.connect("mongodb://localhost:27017/JestDB")
}
// module.exports = mongoose.connect("mongodb://localhost:27017/JestDB");

