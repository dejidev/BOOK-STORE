const express = require("express");
const {postAbook} = require("./book.controlller")
const router = express.Router();

router.post("/create-books", postAbook)


//Get All Books



module.exports = router;
  