// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../modals/userModel");
const userController = require("../controllers/userController") 
const jwtAuthMiddleware = require("../middleware/jwtAuthMiddleware")


// Register a new user
// router.post("/login", jwtAuthMiddleware.generateJwtToken, userController.loginUser);
router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);
module.exports = router;