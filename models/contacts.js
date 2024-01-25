const mongoose = require("mongoose");
const contactsSchema = new mongoose.Schema({
  name: String,
  email: String,
  MobileNo: String,
  Profession: String,
},{
    timestamps: true,
  });

module.exports = mongoose.model('contacts',contactsSchema)
