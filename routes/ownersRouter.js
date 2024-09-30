const express = require("express");
const router = express.Router();

const ownerModel = require("../models/owner-model");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let { fullname, email, password } = req.body;

    const owners = await ownerModel.find();
    if (owners.length > 0) {
      return res
        .status(503)
        .send("You do not have permission to create a new owner");
    }

    const createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });

    res.status(201).send(createdOwner);

    // bcrypt.genSalt(10, (err, salt) => {
    //   bcrypt.hash(password, salt, async (err, hash) => {

    //     let token = jwt.sign(
    //       { email: email, userid: createdOwner._id },
    //       "secretkey"
    //     );

    //     res.cookie("token", token);
    //     res.send("User Registered");
    //   });
    // });
  });
}

router.get("/", (req, res) => {
  res.send("Owner Home Page");
});

module.exports = router;
