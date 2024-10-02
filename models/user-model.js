const mongoose = require("mongoose");

const userScheme = mongoose.Schema({
  fullname: String,
  username: String,
  email: String,
  password: String,
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  orders: {
    type: Array,
    default: [],
  },
  profilePicture: Buffer,
  contact: Number,
});

module.exports = mongoose.model("user", userScheme);
