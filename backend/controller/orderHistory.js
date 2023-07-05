const Order = require("../model/orderHistory");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { userId, products, totalPrice, shippingAddress, paymentMethod } = req.body;

    const newOrder = new Order({
      user: userId,
      products,
      totalPrice,
      shippingAddress,
      paymentMethod,
    });

    await newOrder.save();
    return res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Retrieve order history for a user
const getOrderHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ user: userId }).populate("products").exec();

    return res.status(200).json({ orders });
  } catch (error) {
    console.error("Error retrieving order history:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createOrder, getOrderHistory };
