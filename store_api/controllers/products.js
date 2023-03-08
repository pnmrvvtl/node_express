const getAllProducts = (req, res) => {
    return res.send('get all products');
}

const getAllProductsStatic = (req, res) => {
    return res.send('get all products static');
}

module.exports = {getAllProducts, getAllProductsStatic};