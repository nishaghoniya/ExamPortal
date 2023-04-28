const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    quizTitle: {
        required: true,
        type: String
    },
    nrOfQuestions: {
        required: true,
        type: String
    },
    questions: {
        required: true,
        type: Array
    },
})

module.exports = mongoose.model('Questions', questionSchema,'Questions')