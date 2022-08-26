const mongoose =  require("mongoose");
const orderSchema =  mongoose.Schema({
    productDetail : {type :String,required :true},
    buyer  :{type :String,required:true}
})

module.exports = mongoose.model("order",orderSchema);