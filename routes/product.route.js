var express = require('express');
var router = express.Router();
var ProductController = require('../controllers/product.controller');
/* GET users listing. */
router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findOne);
router.post('/', ProductController.create);

module.exports = router;
