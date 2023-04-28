const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  answers: {
    required: true,
    type: Array,
  },
  userId: { required: true, type: String },
});

module.exports = mongoose.model("Answers", answerSchema, "Answers");
