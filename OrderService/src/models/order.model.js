const mongoose =  require("mongoose");
const orderSchema =  mongoose.Schema({
    productDetail : {
        _id : {type:String},
        productName : {type:String},
        rate : {type : Number}
    },
    buyer  :{type :String,required:true}
})

module.exports = mongoose.model("order",orderSchema);