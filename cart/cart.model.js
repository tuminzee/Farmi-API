const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
    { 
        productName: {
            type: String,
            required: true
        },
        productOwnerId: {
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

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;