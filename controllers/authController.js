const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const jwt = require("jsonwebtoken"); // Make sure to import jwt

module.exports.registerUser = async function (req, res) {
  try {
    let { email, password, fullname } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ error: "You already have an account, please login." });
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.status(500).json({ error: err.message });
        else {
          let user = await userModel.create({
            email,
            password: hash,
            fullname,
          });

          let token = generateToken(user);

          // Send user data and token to the frontend
          res.status(201).json({
            success: true,
            token: token,
            user: {
              id: user._id,
              email: user.email,
              fullname: user.fullname,
            },
          });
        }
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.loginUser = async function (req, res) {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email: email });
  if (!user) {
    return res.status(401).json({ error: "Email or Password incorrect" });
  }

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = generateToken(user);

      // Send user data and token to the frontend
      res.status(200).json({
        success: true,
        token: token,
        user: {
          id: user._id,
          email: user.email,
          fullname: user.fullname,
        },
      });
    } else {
      res.status(401).json({ error: "Email or Password incorrect" });
    }
  });
};

module.exports.logout = function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
};

module.exports.fetchUserData = async function (req, res) {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }

      // Find the user by id
      const user = await userModel.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Send the user data
      res.status(200).json({
        success: true,
        user: {
          id: user._id,
          email: user.email,
          fullname: user.fullname,
          profilePicture: user.profilePicture,
          // Add any other fields you want to send
        },
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.updateProfile = async function (req, res) {
  try {
    const { fullname, password } = req.body;
    const profilePicture = req.file ? req.file.buffer : undefined;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }

      const user = await userModel.findById(decoded.id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update fullname if provided
      if (fullname) {
        user.fullname = fullname;
      }

      // Update profilePicture if provided
      if (profilePicture) {
        user.profilePicture = profilePicture;
      }

      // Update password if provided
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }

      await user.save();

      // Send updated user data
      res.status(200).json({
        success: true,
        user: {
          id: user._id,
          email: user.email,
          fullname: user.fullname,
          profilePicture: user.profilePicture,
        },
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
