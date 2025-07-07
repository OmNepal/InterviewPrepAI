const express = require("express");
const {registerUser, loginnUser, getUserProfile} = require("../controllers/authController");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

//Auth routes
router.post("/register", registerUser);          //Register a new user
router.post("/login", loginUser);                //Login a user
router.get("/profile", protect, getUserProfile); //Get user profile

module.exports = router;