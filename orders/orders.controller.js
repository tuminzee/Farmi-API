const express = require('express');
const router = express.Router();

const orderService = require('./orders.service');

/* GET users listing. */
router.get('/', findAll);
// router.get('/:id', findOne);
router.post('/', create);
router.get('/:id', findOrder);


module.exports = router;


function findAll(req, res){
    orderService.getAll()
    .then(orders => res.json(orders))
    .catch(err => next(err));
};

// function findOne(req, res) {
//     orderService.getById(req.params.id)
//     .then(order => order ? res.json(order) : res.sendStatus(404))
//     .catch(err => next(err));
// };

function create(req, res, next) {
    orderService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function findOrder(req, res){
    orderService.getOrders(req.params.id)
    .then(orders => res.json(orders))
    .catch(err => next(err));
}


