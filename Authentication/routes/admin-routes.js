const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const isAdminUser = require("../middleware/admin-middleware");
const router = express.Router();


router.get("/welcome" , authMiddleware , isAdminUser ,  (req,res)=>{
    return res.status(200).json({
        message : "Welcome to the adminpage"
    })
})

module.exports = router;
