const Book = require("../model/bookModel");

// Create a new book
const createBook = async (req, res) => {
  try {
    const {
      bookTitle,
      authorName,
      ISBN,
      price,
      publishedDate,
      availabilityStatus,
      category,
      bookFrontImage,
      description
    } = req.body;

    const newBook = new Book({
      bookTitle,
      authorName,
      ISBN,
      price,
      publishedDate,
      availabilityStatus,
      category,
      bookFrontImage,
      description
    });

    await newBook.save();
    return res
      .status(201)
      .json({ message: "Book created successfully", book: newBook });
  } catch (error) {
    console.error("Error creating book:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const {
      bookTitle,
      authorName,
      ISBN,
      price,
      publishedDate,
      availabilityStatus,
      category,
      description
    } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      {
        bookTitle,
        authorName,
        ISBN,
        price,
        publishedDate,
        availabilityStatus,
        category,
        description
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//get book byId
const getBookById = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error("Error getting book:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// Delete a book
const deleteBook = async (req, res) => {
    try {
      const { bookId } = req.params;
  
      // Find the book to be deleted
      const deletedBook = await Book.findByIdAndRemove(bookId);
  
      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      // Remove the book from users' carts and favorites
      await User.updateMany(
        {},
        {
          $pull: {
            cart: bookId,
            favBooks: bookId,
          },
        }
      );
  
      return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      console.error("Error deleting book:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (error) {
    console.error("Error getting books:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  createBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getBookById,
};
