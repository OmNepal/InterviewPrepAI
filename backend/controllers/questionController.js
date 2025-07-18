const Question = require("../models/Question");
const Session = require("../models/Session");

// @desc    Add questions to a session
// @route   POST /api/questions/add
// @access  Private(requires JWT)
exports.addQuestionsToSession = async(req,res) => {
    try {
        const {sessionId, questions} = req.body;


        if (!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({message: "Invalid Input Data"})
        }

        const session = await Session.findById(sessionId);

        if (!session) {
            return res.status(404).json({message: "Session not found"})
        }

        //Create new questions
        const createdQuestions = await Question.insertMany(
            questions.map((q) => ({
                session: sessionId,
                question: q.question,
                answer: q.answer
            }))
        );

        //Update session to include new question IDs
        session.questions.push(createdQuestions.map((q) => q._id))
        await session.save();

        res.status(201).json({createdQuestions});
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}

// @desc    Pin/Unpin a question
// @route   POST /api/questions/:id/pin
// @access  Private(requires JWT)
exports.togglePinQuestion = async(req,res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            res.status(404).json({success: false, message: "Question not found"})
        }

        question.isPinned = !question.isPinned;
        await question.save();

        res.status(200).json({success: true, question})

    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}

// @desc    Update the notes of a questions
// @route   POST /api/questions/:id/note
// @access  Private(requires JWT)
exports.updateQuestionNote = async(req,res) => {
    try {
        const { note } = req.body;
        const question = await Question.findById(req.params.id);

        if (!question) {
            res.status(404).json({success: false, message: "Question not found"})
        }

        question.note = note || "";
        await question.save();

        res.status(200).json({success: true, message: "Note updated successfully"})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}