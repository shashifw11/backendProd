const express = require("express");
const authMiddleware = require("../middleware/auth-middleware")
const adminMiddleware = require("../middleware/admin-middleware")
const uploadMidddleware = require("../middleware/upload-middleware");
const {uploadImageController , fetchImagesController , deleteImageController} = require("../controllers/image-controller");
const router = express.Router();

// upload the image

router.post(
    '/upload',
    authMiddleware,
    adminMiddleware,
    uploadMidddleware.single('image'),
    uploadImageController
);

router.get("/get" , authMiddleware , fetchImagesController);
router.delete("/:id" , authMiddleware , adminMiddleware, deleteImageController)

module.exports = router ; 



// to get all the image
