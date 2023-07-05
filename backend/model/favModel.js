const mongoose = require("mongoose");

const favBooksSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Book",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const FavBooks = mongoose.model("FavBooks", favBooksSchema);
module.exports = FavBooks;
