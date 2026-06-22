const express = require("express");
const authMiddleware = require("../middleware/auth-middleware")
const adminMiddleware = require("../middleware/admin-middleware")
const uploadMidddleware = require("../middleware/upload-middleware");
const uploadImageController = require("../controllers/image-controller");
const router = express.Router();

// upload the image

router.post(
    '/upload',
    authMiddleware,
    adminMiddleware,
    uploadMidddleware.single('image'),
    uploadImageController
);

module.exports = router ; 



// to get all the image
