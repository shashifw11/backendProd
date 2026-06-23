const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
   name : {type : String} , 
   category : String , 
   price : Number , 
   inStock : Boolean , 
   tags : [String],

},{timestamps:true})

module.exports = mongoose.model("Product" ,ProductSchema)