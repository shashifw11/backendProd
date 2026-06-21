const express = require("express");
const {loginUser ,registerUser} = require ("../controllers/auth-controller")
const router = express.Router();

// map our routes to our controllers
router.post("/login", loginUser)
router.post("/register", registerUser)

module.exports = router;
