const express = require("express");
const {loginUser ,registerUser} = require ("../controllers/auth-controller")
const router = express.Router();

// map our routes to our controllers
router.post("/loginUser", loginUser)
router.post("/register", registerUser)

module.exports = router;
