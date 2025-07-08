const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
}

// @desc   Register a new user
// @route  POST /api/auth/register
// @access Public
const registerUser = async(req, res) => {
    const {name, email, password} = req.body;

    try {

        //Check id user exists already
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({message: "User exists already"});
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create new user in the database
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        //Send response with user data and JWT
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        }) 

    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }

};

// @desc   Login user
// @route  POST /api/auth/login
// @access Public
const loginUser = async(req, res) => {
    const {email, password} = req.body;

    try {
        //Check if user exists
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: "Invalid credentials"});
        }
        
        //Compare passwords
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        //Send response with user data and JWT
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } catch(error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};

// @desc   Get user profile
// @route  GET /api/auth/profile
// @access Private (Requires JWT)
const getUserProfile = async(req, res) => {
    try {
        //Get user data using req body set by authMiddleware
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        //Send user profile 
        res.json(user);
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};

module.exports = {registerUser, loginUser, getUserProfile};
