const express = require("express");
const { createUser, loginUser, updateUser, getUserById } = require("../controller/userController");

const router = express.Router();
//create user
router.post("/create", createUser);
router.post("/login", loginUser);
router.put("/update", updateUser);
router.get("/me/:id", getUserById);

module.exports = router;