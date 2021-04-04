const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    { 
        productName: {
            type: String,
            required: true
        },
        // desc: {
        //     type: String,
        //     required: true
        // },
        // stock: {
        //     type: Number,
        //     required: true
        // },
        productOwnerId: {
            // type: mongoose.Schema.Types.ObjectId,
            type: String,
            required: true
        },
        productOwnerName: {
            type: String,
            required: true
        },
        productImageUrl: {
            type: String,
            required: true
        },
        productPrice: {
            type: Number,
            required: true
        },
        buyerName: {
            type: String,
            required: true
        },
        buyerId: {
            // type: mongoose.Schema.Types.ObjectId,
            type: String,
            required: true
        },
        quantity: {
            type: Number,
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