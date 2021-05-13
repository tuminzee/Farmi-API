
const db = require('_helpers/db');
const Feedback = db.Feedback;

module.exports = {
    getAll,
    getById,
    create,
};

async function getAll() {
    return await Feedback.find();
}

async function getById(id) {
    return await Feedback.find({feedbackOwnerId: id});
}

async function create(feedbackParam) {
    const feedback = new Feedback(feedbackParam);
    return await feedback.save()
};