const mongoose = require("mongoose");

const productScheme = mongoose.Schema({
  image: String,
  name: String,
  price: Number,
  discount: {
    type: Number,
    default: 0,
  },
  bgcolor: String,
  textcolor: String,
  panelcolor: String,
});

module.exports = mongoose.model("product", productScheme);
