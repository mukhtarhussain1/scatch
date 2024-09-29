const mongoose = require("mongoose");

const ownerScheme = mongoose.Schema({
  fullname: String,
  username: String,
  email: String,
  password: String,
  products: {
    type: Array,
    default: [],
  },
  picture: String,
  gstin: String,
});

module.exports = mongoose.model("owner", ownerScheme);
