const Session = require("../models/Session");
const Question = require("../models/Question");

// @desc   Create a new session
// @route  POST /api/sessions/create
// @access Private (Requires JWT)
const createSession = async(req, res) => {
    try{

    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
}

// @desc   Get all sessions for the logged in user
// @route  GET /api/sessions/my-sessions
// @access Private (Requires JWT)
const getMySessions = async(req, res) => { 
    try{

    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
}

// @desc   Get a session BY id
// @route  GET /api/sessions/:id
// @access Private (Requires JWT)
const getSessionById = async(req, res) => { 
    try{

    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
}

// @desc   Delete a session
// @route  DELETE /api/sessions/:id
// @access Private (Requires JWT)
const deleteSession = async(req, res) => { 
    try{

    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
}


module.exports = {createSession, getMySessions, getSessionById, deleteSession}