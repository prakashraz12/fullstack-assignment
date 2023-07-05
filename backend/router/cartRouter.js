const express = require("express");
const { addToCart } = require("../controller/cartController");

const router = express.Router();
//create user
router.post("/add", addToCart);

module.exports = router;
