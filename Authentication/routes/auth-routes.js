const express = require("express");
const {loginUser ,registerUser , changePassword} = require ("../controllers/auth-controller")
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware")
// map our routes to our controllers
router.post("/login", loginUser)
router.post("/register", registerUser)
router.post("/change-password", authMiddleware ,  changePassword)



module.exports = router;
