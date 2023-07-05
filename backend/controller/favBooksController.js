const FavBooks = require("../model/favModel");
const User = require("../model/userModel");

// Create a favorite book
const createFavBook = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    const user = await User.findById(userId);
    const existingFavBook = await FavBooks.findOne({
      product: productId,
      user: userId,
    });

    if (existingFavBook) {
      return res
        .status(409)
        .json({ message: "Book already exists in favorites" });
    }

    const newFavBook = new FavBooks({
      product: productId,
      user: userId,
    });
    await newFavBook.save();
    user.favBooks.push(newFavBook);
    await user.save();

    return res.status(201).json({
      message: "Book added to favorites successfully",
      favBook: newFavBook,
    });
  } catch (error) {
    console.error("Error creating favorite book:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a favorite book
const deleteFavBook = async (req, res) => {
  try {
    const { favBookId } = req.params;

    const deletedFavBook = await FavBooks.findByIdAndRemove(favBookId);

    if (!deletedFavBook) {
      return res.status(404).json({ message: "Favorite book not found" });
    }

    return res
      .status(200)
      .json({ message: "Favorite book deleted successfully" });
  } catch (error) {
    console.error("Error deleting favorite book:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createFavBook,
  deleteFavBook,
};
