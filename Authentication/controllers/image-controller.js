const Image = require("../models/Image");
const uploadToCloudinary = require("../helper/cloudinaryHelper");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

const uploadImageController = async (req, res) => {

    try {
        if (!req.file) { // check if file is missing in req object
            return res.status(400).json({
                success: false,
                messgae: "File is required , please attach the file"
            })
        }
        // if not missing than upload in cloudinary
        const { url, publicId } = await uploadToCloudinary(req.file.path);

        // store the image url and public id along with the uploaded user id

        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        })

        await newlyUploadedImage.save();
        // delete the file from local storage

        fs.unlinkSync(req.file.path);  // after storing the file in cloudinary delete from local system folder.

        res.status(201).json({
            success: true,
            message: "Imaged uploaded",
            image: newlyUploadedImage
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "something went wrong"

        })
    }
}


const fetchImagesController = async (req, res) => {
    
    try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const skip = (page -1)* limit  ;

    const sort = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 :-1;
    const totalImages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImages/limit);

    const sortObj = {}
    sortObj[sortBy] = sortOrder
    const images = await Image.find().sort(sortObj).skip(skip).limit(limit);
        
    if (images) {
            res.status(200).json({
                success: true,
                currentPage : page,
                totalPages : totalPages,
                totalImages : totalImages,
                data: images,
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "SOmething went wrong during fetching the images"
        })
    }
}

const deleteImageController = async (req, res) => {
    try {
        const getCurrentIdofImageToBeDeleted = req.params.id;
        const userId = req.userInfo.userId;
        const image = await Image.findById(getCurrentIdofImageToBeDeleted);
        if (!image) {
            return res.status(500).json({
                success: false,
                message: "Image not found"
            })
        }
        if (image.uploadedBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorised person to delete this image"
            })
        }
        // delete this image from cloudinary 
        await cloudinary.uploader.destroy(image.publicId);

        // delete this image from mongoDB database
        await Image.findByIdUpdate(getCurrentIdofImageToBeDeleted);

        res.status(200).json({
            success: true,
            message: "Images successfully deleted"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong during fetching the images"
        })
    }
}

module.exports = {
    uploadImageController,
    fetchImagesController,
    deleteImageController
};
