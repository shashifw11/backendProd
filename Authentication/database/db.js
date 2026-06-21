const mongoose = require("mongoose");

const connectToDB = async()=>{
    try{
      const connect = await mongoose.connect(process.env.MONGO_URI)
      console.log("MongoDB connected sucessfully");
    }catch(err){
        console.log("database error" , err)
        process.exit(1);  // immediately terminates the running application
    }
}

module.exports =  connectToDB;
// process.exit(0); // Success
// process.exit(1); // Error/Failure




//Without process.exit(1):   The application is running in a broken state.
// Server Starts
//    ↓
// Database Not Connected
//    ↓
// API Requests Come
//    ↓
// Database Operations Fail
//    ↓
// Runtime Errors Everywhere




//With process.exit(1)
// Database Connection Failed
//         ↓
// Log Error
//         ↓
// Stop Application