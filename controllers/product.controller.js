const Product = require('../models/product.model');

exports.findAll =  (req, res) => {
    Product.find({})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.send(err);
    });
};


exports.findOne = (req, res) => {
    Product.findById(req.params.id, function (err, docs) { 
        if (err){ 
            res.send(err);
        } 
        else{ 
            res.send(docs);
        } 
    }); 
};

exports.create = async (req, res) => {
    const product = new Product({
        name: req.body.name,
        desc: req.body.desc,
        stock: req.body.stock,
        price: req.body.price
    })

    await product.save()
    .then((data) => {
        res.send(data);
    })
    .catch(err => {
        res.send(err);
    })
};