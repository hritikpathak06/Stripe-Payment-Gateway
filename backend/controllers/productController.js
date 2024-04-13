const Product = require("../models/productModel");

// Create Product

exports.createProduct = async(req,res) => {
    
    const {name,price} = req.body;


    const product = await Product.create({
        name,
        price
    })

    return res.status(201).json(product)
}

exports.getAllProduct = async(req,res) => {
    const products = await Product.find();
    return res.status(200).json(products);
}