const mongoose = require("mongoose");

const userScheme = mongoose.Schema({
  fullname: String,
  username: String,
  email: String,
  password: String,
  cart: {
    type: Array,
    default: [],
  },
  isadmin: Boolean,
  orders: {
    type: Array,
    default: [],
  },
  picture: String,
  contact: Number,
});

module.exports = mongoose.model("user", userScheme);
