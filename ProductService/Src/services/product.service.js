const productSchema =  require("../models/product.model");

// inserting data to db
const insertProduct = async(data)=>{
    const product = await productSchema.create(data);
    return product
        
}
//  extracting all products from db
const extractProduct = async ()=>{
    const products =  await productSchema.find().lean().exec();
    return products
 }

//  getSingleProduct from db

const getSingleProduct = async (id)=>{
    const product =  await productSchema.findById(id).lean().exec();
    return product
}

module.exports = { insertProduct, extractProduct, getSingleProduct }