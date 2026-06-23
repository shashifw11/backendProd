const express = require("express");
const {insertSampleProducts,getProductStats,getProductAnalysis}= require("../controllers/Product-controller");
const router = express.Router();


router.post("/add" , insertSampleProducts)
router.get("/stats" , getProductStats);
router.get("/analysis" , getProductAnalysis);




module.exports = router
