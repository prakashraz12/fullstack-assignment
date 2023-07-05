const mongoose = require('mongoose');

// MongoDB connection URI
const mongoURI = "mongodb+srv://CLG_MGT:CLG_MGT@cluster0.gj8w7ym.mongodb.net/";

// Mongoose connection options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Export the connection function
module.exports = () => {
  return mongoose.connect(mongoURI, mongooseOptions);
};
