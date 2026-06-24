require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose")
const http = require("http");
const socketIo = require("socket.io");

const app = express();


const server = http.createServer(app);

// initiate socket.io and attch this to the http server
const io = socketIo(server) // this is initiallization of socket.Io
app.use(express.static('public')); // which folder targeting





// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         console.log("MongoDB connected successfully");
//     })
//     .catch((err) => {
//         console.log("MongoDB connection error:", err);
//     });

// app.listen(process.env.PORT, async() => {
//    console.log(`listining on port ${process.env.PORT}`)
// })

