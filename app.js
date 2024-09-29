const express = require("express");
const app = express();

const userModel = require("./models/user-model");
const productModel = require("./models/product-model");

const cookieParser = require("cookie-parser");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(3000);
