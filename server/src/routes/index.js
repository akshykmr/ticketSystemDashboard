const express = require("express");
const authRoutes = require("./authRoute.js");
const ticketRoutes = require("./otherRoute.js");

const router = express.Router();

// Health check route to verify server status
router.get("/health-check", (req, res, next) => res.status(200).send("OK"));

// auth Routes
router.use("/user", authRoutes);

// Ticket ROutes
router.use("/tickets", ticketRoutes);

module.exports = router;