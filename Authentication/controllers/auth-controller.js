const User = require("../models/Users")
const bcrypt= require("bcryptjs");
// register controller 
const registerUser = async(req,res)=>{
    try{
        console.log(req.body);
        //extract user information from the request body
        const {username , email , password, role} = req.body // what ever the request comes from the user server recive these three data from the body
        
        // check if the user is already exist in our database
          const checkExistuser = await User.findOne({$or : [{username},{email}]})  // checking email and user name exist in database or not
          if(checkExistuser){
                return res.status(400).json({
                    success : false , 
                    message : "User already exist please try from diffrent username or password"
                })
          }
          // hash user apssword 
         const salt = await bcrypt.genSalt(10);  // A salt is a random string added to the password before hashing.  , The number 10 is the cost factor (or rounds)., It does NOT mean: , Hash password 10 times , Instead it means:Generate a salt using 2^10 operations means 10 rounds = 1024 operations
         // Higher rounds = slower hashing = harder for hackers to brute force passwords.
        
         //  Rounds	Usage
         //    8	Fast
         //    10	Most common
         //    12	More secure
         //    14+	Very secure but slower

         const hashPassword = await bcrypt.hash(password, salt);  // Now the hashes are completely different even though the passwords are the same.

         // create a new user and save in your data base
         const newlyCreatedUser = new User({
            username,
            email,
            password : hashPassword,
            role : role || "user"
         })

         await newlyCreatedUser.save()

         if(newlyCreatedUser){
            res.status(201).json({
                success : true,
                message : 'user registred sucessfull',
            })
         }else{
             res.status(500).json({
                success : false,
                message : 'user register failed'
             })
         }

    }catch(err){
        console.log(err)
        res.status(500).json({
            sucess : false , 
            message : "SOme error occured please try again"
        })
    }
}


// login controller

const loginUser = async(req,res)=>{
    try{

    }catch(err){

    }
}

module.exports = {loginUser , registerUser}
