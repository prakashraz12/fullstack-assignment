const User = require("../model/userModel");
const Book = require("../model/bookModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/tokenGenerator");

// Create a new user
const createUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res
      .status(201)
      .json({ message: "User created successfully", newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { fullName, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await User.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Login user

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .populate("cart")
      .populate("favBooks")
      .exec();
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateToken(
      { userId: user._id },
      process.env.JSON_SECRET,
      "1h"
    );

    const refreshToken = generateToken(
      { userId: user._id },
      process.env.JSON_SECRET,
      "7d"
    );

    // Set the refreshToken cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    // Send the user data in the response
    res.status(200).json({ user, accessToken });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Logout user
const logoutUser = async (req, res) => {
  try {
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//get user by id
const getUserById = async (req, res) => {
  const id = req.params;
  try {
    const user = await User.findById(id).populate("cart").populate("favBooks");
    if (!user) {
      res.status(400).json({ message: "user not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  getUserById
};
