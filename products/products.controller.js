const express = require('express');
const router = express.Router();

const productService = require('./product.service');

/* GET users listing. */
router.get('/', findAll);
router.get('/:id', findById);
router.post('/', create);

module.exports = router;


function findAll(req, res){
    productService.getAll()
    .then(products => res.json(products))
    .catch(err => next(err));
};

function findById(req, res) {
    productService.getById(req.params.id)
    .then(product => product ? res.json(product) : res.sendStatus(404))
    .catch(err => next(err));
};

function create(req, res, next) {
    productService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

