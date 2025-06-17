const Book = require("./book.model");


const postAbook = async (req, res) => {
    try {
        const newBook = await Book({ ...req.body })
        // await newBook.save();
        res.status(200).send({ message: "Book posted successfully...", book: newBook })
    } catch (error) {
        console.error("Error creating book", error);
        res.status(500).send({ message: "Fail to create a book" })
    }
}

module.exports = {
    postAbook
}