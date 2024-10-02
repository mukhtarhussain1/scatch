const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    let { name, price, discount, bgcolor, textcolor, panelcolor } = req.body;
    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash("success", "Product created successfully");
    res.redirect("/owners/admin");
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/allProducts", async (req, res) => {
  try {
    const products = await productModel.find();
    const formattedProducts = products.map(product => ({
      id: product._id,
      name: product.name,
      description: product.description || "", // Assuming description field exists, otherwise it's an empty string
      price: product.price,
      image: `data:image/jpeg;base64,${product.image.toString('base64')}` // Convert Buffer to base64 string
    }));
    res.json(formattedProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
