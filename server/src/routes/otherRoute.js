const express = require("express");
const operationController = require("../controllers/operationController");
const {verifyTokenForSuperAdmin, verifyTokenForUser} = require("../middelware/jwtTokens")

const router = express.Router();

// category route
router.post("/createCategory", verifyTokenForSuperAdmin,  operationController.createCategory);
router.get("/getCategoryes", verifyTokenForUser, operationController.getCategories);

// ticket route
router.post("/createTicket", verifyTokenForSuperAdmin,  operationController.createTicket);
router.get("/getTickets", verifyTokenForSuperAdmin,  operationController.getTickets);

// purchase ticket route

router.post("/purchaseTicket", verifyTokenForUser,  operationController.purchaseTicket);


// superadmin routes
router.get("/getDashboardData", verifyTokenForSuperAdmin,  operationController.getTotalCounts);

router.get("/getAllUsers", verifyTokenForSuperAdmin,  operationController.getAllUsers);

router.post("/toggleUserActivation", verifyTokenForSuperAdmin,  operationController.toggleUserActivation);

router.get("/getUserTicketHistory", verifyTokenForUser,  operationController.getUserTicketHistory);

router.get("/getTicketsforUsers", verifyTokenForUser,  operationController.getTicketsforUsers);

module.exports = router;