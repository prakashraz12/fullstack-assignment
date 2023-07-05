const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const checkUserRole = (role) => {
  return async (req, res, next) => {
    console.log(req.userId);
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (user.userType === role) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({ message: "Forbidden" });
      }
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  };
};

module.exports = checkUserRole;
