const Book = require("./book.model");



const postAbook = async (req, res) => {
    try {
        const newBook = await Book({ ...req.body });
        await newBook.save();
        res.status(200).json({ message: "Book posted successfully...", book: newBook });
    } catch (error) {
        console.error("Error creating book", error);
        res.status(500).json({ message: "Fail to create a book" });
    }
};

const getAllbooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).send(books)
    } catch (error) {
        console.error("Error fetching books", error)
        res.status(500).send({ mesage: "Failed to fetch books" })

    }
}


const getSingleBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            res.status(404).send({ message: "Book gotten successfully", book: newBook })
        }
        res.status(200).send(book)
    } catch (error) {
        console.error("Error fetching books", error)
        res.status(500).send({ mesage: "Failed to fetch books" })
    }
}


const updateBookData = async (req, res) => {


    try {
        const { id } = req.params;

        const updateBook = await Book.findByIdAndUpdate(
            id,
            req.body,
            { new: true } // return the updated document
        );

        if (!updateBook) {
            return res.status(404).send({ message: "Book is not found" }); // ✅ add return
        }

        res.status(200).send({
            message: "Book updated successfully",
            book: updateBook
        });

    } catch (error) {
        console.error("Error updating books", error);
        res.status(500).send({ message: "Failed to update books" }); // ✅ also fixed typo: "mesage" -> "message"
    }


}








const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).send({ message: "Book not found" }); // ✅ Add `return` here
        }

        return res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        });
    } catch (error) {
        console.error("Error deleting book", error);
        return res.status(500).send({ message: "Failed to delete book" }); // ✅ Typo fix: 'message'
    }
};



module.exports = {
    postAbook,
    getAllbooks,
    getSingleBook,
    updateBookData,
    deleteBook
}