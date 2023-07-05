const Cart = require("../model/cartModel");
const User = require("../model/userModel")
// Add a product to the cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingCartItem = await Cart.findOne({
      user: userId,
      product: productId,
    });
    if (existingCartItem) {
      return res
        .status(409)
        .json({ message: "Product already exists in the cart" });
    }

    const newCartItem = new Cart({
      user: userId,
      product: productId,
      quantity: 1,
    });

    await newCartItem.save();

    // Add the newCartItem to the user's cart array
    existingUser.cart.push(newCartItem);
    await existingUser.save();

    return res.status(201).json({
      message: "Product added to cart successfully",
      cartItem: newCartItem,
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// Update the quantity of a cart item
const updateCartItemQuantity = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    const updatedCartItem = await Cart.findByIdAndUpdate(
      cartItemId,
      { quantity },
      { new: true }
    );

    if (!updatedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    return res.status(200).json(updatedCartItem);
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Remove a product from the cart
const removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    const deletedCartItem = await Cart.findByIdAndRemove(cartItemId);

    if (!deletedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    return res
      .status(200)
      .json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get cart items for a user
const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    const cartItems = await Cart.find({ user: userId }).populate("product");

    return res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error getting cart items:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  getCartItems,
};
