
const { insertProduct, extractProduct, getSingleProduct } = require("../services/product.service")
const rabbitConnection = require("../utils/rabbitmq");

// rabbitConnection("Buy_Product");

//  creating new product
const createProduct = async (req, res) => {
    try {
        //  calling insertProduct fun^ for insert data into db 
        const product = await insertProduct(req.body);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(501).send(error.message)
    }
};


//  getting all products
const getAllProducts = async (req, res) => {
    try {
        //  calling extractProduct fun^ to get all product data from db
        const products = await extractProduct();
        return res.status(200).send(products);
    } catch (error) {
        return res.status(501).send(error.message)
    }
}

//  buying products 
const buyProduct = async(req,res)=>{
    try {
        const product = await getSingleProduct(req.params.id);
        let defaultUser = "ankushgupta41097";
        await rabbitConnection({product,defaultUser})
        console.log("send it")
        return res.status(200).send({product,"buyer" :defaultUser })
        
    } catch (error) {
        return res.status(501).send(error.message)
    }
}


module.exports = { createProduct, getAllProducts, buyProduct };