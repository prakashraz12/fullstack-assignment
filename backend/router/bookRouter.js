const express = require("express");
const { createBook, getBookById, getAllBooks } = require("../controller/bookController");
const authenticateUser = require("../middleware/auth");
const checkUserRole = require("../middleware/check-role");

const router = express.Router();
//create Book
router.post("/add", authenticateUser, checkUserRole("admin"), createBook);
//get book by id
router.get("/get/:id", getBookById);
//get all books
router.get("/allbooks", getAllBooks);

module.exports = router;