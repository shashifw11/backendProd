const Author = require('../models/Author');
const Book = require("../models/Book");


const createAuthor = async (req, res) => {
    try {
        const author = new Author(req.body);
        await author.save()

        res.status(201).json({
            success: true,
            data: author
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "something went wrong Author conroller"
        })
    }
}

const createBook = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        const book = new Book(req.body);
        console.log("BOOK:", book);

        await book.save()
      
        res.status(201).json({
            success: true,
            data: book
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "something went wrong in Book conroller"
        })
    }
}

const getBookWithAuthor = async(req,res)=>{
    try{
       const book = await Book.findById(req.params.id).populate("author");
       if(!book){
          return res.status(404).json({
            success : false ,
            message : "book not found"
          })

       }
       res.status(200).json({
        success : true , 
        data : book
       })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success : false , 
            message : "something went wrong please try again"
        })
    }
}

module.exports = { createAuthor, createBook  , getBookWithAuthor};