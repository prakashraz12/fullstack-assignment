const express = require("express");
const { createFavBook } = require("../controller/favBooksController");

const router = express.Router();
//create user
router.post("/add", createFavBook);

module.exports = router;