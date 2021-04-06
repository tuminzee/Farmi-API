
const db = require('_helpers/db');
const Order = db.Order;

module.exports = {
    getAll,
    // getById,
    create,
    getOrders
};

async function getAll() {
    return await Order.find();
}

async function create(orderParam) {
    const order = new Order(orderParam);
    return await order.save()
};

async function getOrders(id){
    return await Order.find({buyerId: id});
} 