const express = require('express');
const router = express.Router();

const feedbackService = require('./feedback.service');

/* GET users listing. */
router.get('/', findAll);
router.get('/:id', findById);
router.post('/', create);

module.exports = router;


function findAll(req, res){
    feedbackService.getAll()
    .then(feedbacks => res.json(feedbacks))
    .catch(err => next(err));
};

function findById(req, res) {
    feedbackService.getById(req.params.id)
    .then(feedback => feedback ? res.json(feedback) : res.sendStatus(404))
    .catch(err => next(err));
};

function create(req, res, next) {
    feedbackService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

