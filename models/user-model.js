const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/scatch");

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
