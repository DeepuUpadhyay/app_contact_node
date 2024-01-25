const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName: { type: String, required: [true, "Please add the user Name"] },
  email: {
    type: String,
    required: [true, "Please add user email address"],
    unique: [true, "Email addres already added"],
  },
 password:{
    type:String,
    required:[true,"please enter a password."]
 }
});

module.exports = mongoose.model("Users", userSchema);
