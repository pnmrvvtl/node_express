const Product = require('../models/product');

const getAllProducts = async (req, res) => {
    const {featured, company, name} = req.query;

    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === 'true';
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i'}
    }

    const products = await Product.find(queryObject);
    return res.status(200).json({products, nbHits: products.length});
}

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find();
    return res.status(200).json({products, nbHits: products.length});
}

module.exports = {getAllProducts, getAllProductsStatic};