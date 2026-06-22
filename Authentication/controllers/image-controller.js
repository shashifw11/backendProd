const Image = require("../models/Image");
const uploadToCloudinary = require("../helper/cloudinaryHelper");
const fs  = require("fs");

const uploadImageController = async(req,res)=>{
    
    try{
        if(!req.file){ // check if file is missing in req object
         return res.status(400).json({
             success : false,
             messgae : "File is required , please attach the file"
         })
        }
        // if not missing than upload in cloudinary
        const {url , publicId} = await uploadToCloudinary(req.file.path);
       
        // store the image url and public id along with the uploaded user id
        
        const newlyUploadedImage = new Image({
            url , 
            publicId,
            uploadedBy : req.userInfo.userId
        })
         
        await newlyUploadedImage.save();
        // delete the file from local storage

        fs.unlinkSync(req.file.path);  // after storing the file in cloudinary delete from local system folder.

        res.status(201).json({
            success : true , 
            message : "Imaged uploaded",
            image : newlyUploadedImage
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : "something went wrong"

        })
    }
}

module.exports = uploadImageController;
