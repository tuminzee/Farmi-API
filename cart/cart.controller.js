const express = require('express');
const router = express.Router();

const cartService = require('./cart.service');

/* GET users listing. */
router.get('/', findAll);
// router.get('/:id', findOne);
router.post('/', create);
router.get('/:id', findCart);


module.exports = router;


function findAll(req, res){
    cartService.getAll()
    .then(carts => res.json(carts))
    .catch(err => next(err));
};


function create(req, res, next) {
    cartService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function findCart(req, res){
    cartService.getCarts(req.params.id)
    .then(carts => res.json(carts))
    .catch(err => next(err));
}


