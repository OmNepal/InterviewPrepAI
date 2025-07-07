require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

// Middleware to handle CORS
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

//Connect to MongoDB
connectDB();

//Middleware to parse JSON bodies
app.use(express.json());

//Routes



//Server uploads foler
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}))

//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));