const express = require('express');
const {togglePinQuestion, updateQuestionsNote, addQuestionsToSession} = require("../controllers/questionController");
const {protect} = require("../middlewares/authMiddleware")

const router = express.Router();

router.post("/add",protect, addQuestions);
router.post("/:id/pin", protect, togglePinQuestion);
router.post("/:id/note", protect, updateQuestionsNote);

module.exports = router;