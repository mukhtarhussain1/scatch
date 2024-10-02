const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  fetchUserData,
  logout,
  updateProfile
} = require("../controllers/authController");
const upload = require("../config/multer-config");


router.get("/", (req, res) => {
  res.send("Home Page");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logout);

router.get('/fetchUserData', fetchUserData);

router.put('/updateProfile', upload.single('profilePicture'), updateProfile);

module.exports = router;
