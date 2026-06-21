require("dotenv").config();
const express = require("express");
const authRoutes = require('./routes/auth-routes');
const connectToDB = require("./database/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth" , authRoutes);  

app.listen(PORT , ()=>{
    try{
      connectToDB();
          console.log(`Server lsitining on ${PORT}`);
    }catch(err){
        console.log(err.message);

    }
})