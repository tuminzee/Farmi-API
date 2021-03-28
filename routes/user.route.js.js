var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user.controller');

router.post('/signup', UserController.singup);
router.post('/login', UserController.login);

module.exports = router;
