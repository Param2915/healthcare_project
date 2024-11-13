// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../modals/userModel");
const userController = require("../controllers/userController") 
const jwtAuthMiddleware = require("../middleware/jwtAuthMiddleware")


// Register a new user
router.post("/login", jwtAuthMiddleware.generateJwtToken, userController.loginUser);
// router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);

//route for get the user specified data
router.post("/myaccount",jwtAuthMiddleware.validateJwtToken,userController.getUserProfile);
// router.post("/myaccount",userController.getUserProfile);

//route for updating the user specififed data
router.patch("/myaccount",jwtAuthMiddleware.validateJwtToken,userController.updateUserProfile);
// router.patch("/myaccount",userController.updateUserProfile);

module.exports = router;