const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
      type: String,
      required: true  
    },
    password:{
        type: String,
        required: true
    },
    cart:[
      {
        type: mongoose.Types.ObjectId,
        ref:"Cart"
      }
    ],
    favBooks:[
        {
            type: mongoose.Types.ObjectId,
            ref:"FavBooks"
        }
    ],
    userType:{
        type: String,
        default: "User"
    }
},{timestamps: true})

const User = mongoose.model('User', userSchema);
module.exports = User;
