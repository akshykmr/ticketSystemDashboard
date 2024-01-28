const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Login route
router.post("/login", authController.loginUser);

// Signup route
router.post("/signup", authController.registerUser);

module.exports = router;