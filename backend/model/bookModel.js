const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    ISBN: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    publishedDate: {
      type: Date,
      required: true,
    },
    availabilityStatus: {
      type: Boolean,
      default: true,
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    bookFrontImage:{
        type: String,
        default:""
    }
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
