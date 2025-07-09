const Session = require("../models/Session");
const Question = require("../models/Question");

// @desc   Create a new session
// @route  POST /api/sessions/create
// @access Private (Requires JWT)
const createSession = async(req, res) => {
    try{
        const {role, experience, topicsToFocus, description, questions} = req.body;

        const userId = req.user._id; //auth middleware sets req.user

        const session = await Session.create({
            user: userId,
            role, 
            experience, 
            topicsToFocus,
            description,
        });

        const questionDocs = await Promise.all(
            questions.map(async(q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer
                });
                return question._id;
            })
        );

        session.questions = questionDocs;
        await session.save();

        return res.status(201).json({success: true, session});

    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
}

// @desc   Get all sessions for the logged in user
// @route  GET /api/sessions/my-sessions
// @access Private (Requires JWT)
const getMySessions = async(req, res) => { 
    try{
        const sessions = 
            await Session.find({user: req.user._id})
                        .sort({createdAt: -1})
                        .populate("questions")
        if (!sessions) {
            return res.status(404).json({message: "No session found"})
        }

        res.status(200).json({sessions})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
}

// @desc   Get a session BY id
// @route  GET /api/sessions/:id
// @access Private (Requires JWT)
const getSessionById = async(req, res) => { 
    try{
        const sessionId = req.params.id;
        const session = await Session.findById(sessionId)
            .populate({
                path: "questions",
                options: {sort: {isPlanned: -1, createdAt: 1}},
            })
            .exec();

        if (!session) {
            return res.status(404).json({success: false, message: "No session found"})
        }
            
        res.status(200).json({success: true, session})

    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
}

// @desc   Delete a session
// @route  DELETE /api/sessions/:id
// @access Private (Requires JWT)
const deleteSession = async(req, res) => { 
    try{
        const sessionId = req.params.id;
        const session = await Session.findById(sessionId)

        if (!session) {
            return res.status(404).json({message: "No session found"})
        }

        //Check if the logged in user owns this session
        if (session.user.toString() !== req.user.id) {
            return res.status(401).json({message: "Not authorized to delte this sessions"})
        }

        //First delete all the questions linked to this session
        await Question.deleteMany({session: session._id});

        //Then delete the session
        await session.deleteOne();

        res.status(200).json({message: "Deletion Successful"})

    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
}


module.exports = {createSession, getMySessions, getSessionById, deleteSession}