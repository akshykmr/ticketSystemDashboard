const express = require("express");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../middelware/jwtTokens.js");
const User = require("../models/userModal.js");

const registerUser = async (req, res) => {
  try {
    const { email, phone } = req.body;
    const existingUserWithEmail = await User.findOne({ email });

    const existingUserWithMobile = await User.findOne({ phone });

    if (existingUserWithEmail) {
      console.log("User Already Exist with this email");
      return res.json({
        success: false,
        message: "Email already exists, please choose another email",
        duplicateItem: "email",
      });
    } else if (existingUserWithMobile) {
      console.log("User with this mobile number already exists");
      return res.json({
        success: false,
        message:
          "Mobile number already exists, please choose another mobile number",
        duplicateItem: "mobile",
      });
    } else {
      const { password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: "user",
        phone: req.body.phone,
        is_deactivated: false,
      });

      const response = await user.save();

      const token = await generateJWT(response._id);

      res.json({
        success: true,
        message: "User successfully registered",
        user: response,
        token: token,
      });
      console.log("User successfully registered");
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while registering the user." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body;

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userId);

    const query = isEmail ? { email: userId } : { phone: userId };

    const existingUser = await User.findOne(query);
    if (!existingUser) {
      return res.json({
        success: false,
        message: `Invalid ${isEmail ? "Email" : "phone"}`,
      });
    }

    if (existingUser.is_deactivated) {
      return res.json({
        success: false,
        message: "Your account has been deactivated",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = await generateJWT(existingUser._id);
    return res.json({
      success: true,
      message: "Login Success",
      token: token,
      role: existingUser.role,
    });
  } catch (error) {
    console.log(error, "error occurred");
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
