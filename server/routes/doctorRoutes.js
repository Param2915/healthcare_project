const express = require("express");
const router = express.Router();
const doctorDetailControllers = require("../controllers/doctorDetailsController");
const jwtAuthMiddleware = require("../middleware/jwtAuthMiddleware");

router.post("/register", doctorDetailControllers.registerDoctor);

// router.get("/", doctorDetailControllers.getAllDoctors)
// router.get("/email/:email", doctorDetailControllers.g);
module.exports = router;