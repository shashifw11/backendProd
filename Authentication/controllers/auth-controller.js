const User = require("../models/Users")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// register controller 
const registerUser = async (req, res) => {
    try {
        console.log(req.body);
        //extract user information from the request body
        const { username, email, password, role } = req.body // what ever the request comes from the user server recive these three data from the body

        // check if the user is already exist in our database
        const checkExistuser = await User.findOne({ $or: [{ username }, { email }] })  // checking email and user name exist in database or not
        if (checkExistuser) {
            return res.status(400).json({
                success: false,
                message: "User already exist please try from diffrent username or password"
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
            password: hashPassword,
            role: role || "user"
        })

        await newlyCreatedUser.save()

        if (newlyCreatedUser) {
            res.status(201).json({
                success: true,
                message: 'user registred sucessfull',
            })
        } else {
            res.status(500).json({
                success: false,
                message: 'user register failed'
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            sucess: false,
            message: "SOme error occured please try again"
        })
    }
}

// login controller
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;  // collect username and password from request body
        const user = await User.findOne({ username }); // cheak username exist in database or not
        if (!user) {
            return res.status(400).json({  // if user not exist in databse return this message in response
                success: false,
                message: "user dosent exist"
            })
        }
        // if user exist in database than find the password of user is match with database password or not
        const isPasswordMatch = await bcrypt.compare(password, user.password) // comparing the req.body passowrd with database stored hashed password
        if (!isPasswordMatch) {  // password not match with database paasword
            return res.status(400).json({
                success: false,
                message: "passowrd doesnot matched!"
            })
        }
        // if passowrd match than we are going to create a brear token base on that user information stored in database
        // now install first Json web token

        // create user token
        const accessToken = jwt.sign({
            userId: user._id,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "15m"
        })

        res.status(200).json({
            success: true,
            message: "Logged in successful",
            accessToken
        })
    } catch (err) {
        console.log("err", err)
    }
}

// change password
const changePassword = async(req,res)=>{
    try{
        const userId = req.userInfo.userId // after access the token we decode it and collect the all user information and store it in userInfo 
        // extract old and new password
        const {oldPassword , newPassword} = req.body;
        // find the current logged in user
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                success : false,
                message : "user not find"
            })
        }

        // check if the old password is correct
        const isPasswordMatch = await bcrypt.compare(oldPassword , user.password);
        
        if(!isPasswordMatch){
            return res.status(400).json({
                success : false, 
                message  : "Old password is not correct Please try again."
            })
        }
        // hash the new password here
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword,salt);

         // update user password
         user.password = newHashedPassword // old password update by new hashed password
         await user.save()  // now save this in database
          
        res.status(200).json({
            success : true , 
            message : "Password chnage successfully"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success : false , 
            message : "user not authenticated"
        })
    }
}


module.exports = { loginUser, registerUser  , changePassword}


