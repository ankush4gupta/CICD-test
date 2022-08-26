const orderSchema = require("../models/order.model");


//  getting all orders from db
const extractOrders = async () => {
    const orders = await orderSchema.find().lean().exec();
    return orders
}

//  insert orders into db

const insertOrder =  async (data)=>{
    console.log("dataget",data);
    let obj = {
        productDetail : data.product,
        buyer : data.defaultUser
    }


    const order = await orderSchema.create(obj);
    return order
}

module.exports = { extractOrders, insertOrder }