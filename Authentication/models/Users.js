const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
     username : {
        type : String,
        required : true, 
        unique : true,
     },
     email :{
        type : String,
        unique : true,
        required : true,
        trim : true , 
        lowercase : true
     },
     password : {
        type : String,
        required : true
     },
     role : {
        type : String , 
        enum : ["user" , "admin"] ,// only alow enum for user or admin role
        default : "user",
     }

},{
    timestamps : true
})

module.exports = mongoose.model('Users',UserSchema)