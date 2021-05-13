const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    { 
        buyedId: {
            type: String,
            required: true
        },
        buyerName: {
            type: String,
            required: true
        },
        orderDetails :{
            type: String,
            required: true
        },
        total: {
            type: Number,
            required: true
        }

    }, {
            timestamps: true
        });

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;