require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const productRoutes = require("./routes/product-routes")
const bookRoutes = require("./routes/book-routes")
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        return console.log("mongoDB connected successfully")
    }).catch((err) => {
        return console.log(err, "mongoDB not connected")
    }
)



app.use("/products" , productRoutes)
app.use("/reference" , bookRoutes)


app.listen(process.env.PORT, () => {
    try {
        console.log(`server Running on PORT ${process.env.PORT} `);
    } catch (err) {
        console.log('err', "server not connect proper");

    }
})

