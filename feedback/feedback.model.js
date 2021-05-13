const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema(
    { 
        name: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
    }, {
            timestamps: true
        });

const Feedback = mongoose.model('feedback', FeedbackSchema);

module.exports = Feedback;