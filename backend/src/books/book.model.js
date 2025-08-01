const mongoose = require('mongoose')
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    trending: {
        type: Boolean,
        required: true,
    },
    coverImage: {
        type: String,
        required: true
    },
    oldPrice: {
        type: Number,
    },
    newPrice: {
        type: Number,
    }
}, {
    timestamps: true
});

const Book = mongoose.model("Book", BookSchema)

module.exports = Book;