const express = require("express");
const { postAbook, getAllbooks, getSingleBook, updateBookData, deleteBook } = require("./book.controlller")
const router = express.Router();

const  verifyAdminToken = require("../middleware/verifyAdminToken")
//post a book
router.post("/create-books", postAbook)


//Get All Books
router.get("/", getAllbooks)

//Get a single book
router.get("/:id", getSingleBook)

//Update a put input
router.put("/edit/:id", updateBookData)

//Delete a book
router.delete("/:id", deleteBook)


module.exports = router;
