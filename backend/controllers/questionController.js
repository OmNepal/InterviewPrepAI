const Question = require("../models/Question");
const Session = require("../models/Session");

// @desc    Add questions to a session
// @route   POST /api/questions/add
// @access  Private(requires JWT)
const addQuestionsToSession = async(req,res) => {
    try {

    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}

// @desc    Pin/Unpin a question
// @route   POST /api/questions/:id/pin
// @access  Private(requires JWT)
const togglePinQuestion = async(req,res) => {
    try {

    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}

// @desc    Update the notes of a questions
// @route   POST /api/questions/:id/note
// @access  Private(requires JWT)
const updateQuestionsNote = async(req,res) => {
    try {

    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}