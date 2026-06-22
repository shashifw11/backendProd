const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async(filepath)=>{
    try{
      const result = await cloudinary.uploader.upload(filepath);
       return {
         url: result.secure_url ,    // when file upload in cloudinary than cloudinary give us public id and file url so we can access the file 
         publicId : result.public_id
       }
    }catch(err){
        console.log("Error while uploading to cloudinary");
        throw new Error("Error while uploading to Cloudinary");
    }
}

module.exports = uploadToCloudinary