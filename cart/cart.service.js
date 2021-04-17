
const db = require('_helpers/db');
const Cart = db.Cart;

module.exports = {
    getAll,
    // getById,
    create,
    getCarts
};

async function getAll() {
    return await Cart.find();
}

async function create(cartParam) {
    const cart = new Cart(cartParam);
    return await cart.save()
};

async function getCarts(id){
    return await Cart.find({buyerId: id});
} 