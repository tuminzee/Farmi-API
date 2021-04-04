
const db = require('_helpers/db');
const Product = db.Product;

module.exports = {
    getAll,
    getById,
    create,
};

async function getAll() {
    return await Product.find();
}

async function getById(id) {
    return await Product.find({productOwnerId: id});
}

async function create(productParam) {
    const product = new Product(productParam);
    return await product.save()
};