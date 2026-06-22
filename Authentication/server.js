require("dotenv").config();
const express = require("express");
const authRoutes = require('./routes/auth-routes');
const connectToDB = require("./database/db");
const homeRoutes = require("./routes/home-routes");
const adminRoutes = require("./routes/admin-routes");
const uploadImageRoutes = require("./routes/image-routes");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);           // for admi  we are going to do two layers of protection first check user is authenticate or not and seconed is user is authorozed or not. 
app.use("/api/image", uploadImageRoutes);

app.listen(PORT, () => {
    try {
        connectToDB();
        console.log(`Server lsitining on ${PORT}`);
    } catch (err) {
        console.log(err.message);

    }
})