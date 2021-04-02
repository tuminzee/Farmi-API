const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    { 
        name: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
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
        }
    }, {
            timestamps: true
        });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;