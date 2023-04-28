const express = require("express");
const QuestionModel = require("../models/questionModel");
const AnswerModel = require("../models/answerModel");
const UserModel = require("../models/userModel");

const router = express.Router();

router.post("/submit", async (req, res) => {
  const data = new AnswerModel({
    answers: req.body.answers,
    userId: req.body.userId,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const data = await QuestionModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const data = new UserModel({
    name: req.body.name,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/result/:id", async (req, res) => {
  try {
    let correct = [];
    let result = 0;
    const data = await AnswerModel.find();
    let answer = data.find((item) => item.userId === req.params.id).answers;
    const questionData = await QuestionModel.find();
    questionData[0].questions.map((item, index) => {
      correct.push({ id: index, data: item.correctAnswer });
    });
    correct.map((value) => {
      let objecta = answer.find((item) => parseInt(item.id) === value.id);
      if (objecta) {
        if (JSON.stringify(objecta.value) === JSON.stringify(value.data)) {
          result = result + 1;
        }
      }
    });
    res.json({ score: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
