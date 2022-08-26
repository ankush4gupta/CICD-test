const { extractOrders }  = require("../services/order.service")

//  getting all orders
const getAllOrders = async(req,res)=>{
    try {
        const orders =  await extractOrders();
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(501).send(error.message)
    }
}

module.exports = {getAllOrders}