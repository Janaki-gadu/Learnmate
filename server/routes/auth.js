const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// ================= SIGNUP =================

router.post("/signup", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({
      message: "User created successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }

});

// ================= LOGIN =================

router.post("/login", async (req, res) => {

  try {

    console.log("LOGIN API HIT");

    const { email, password } = req.body;

    console.log("EMAIL:", email);

    // Find user
    const user = await User.findOne({ email });

    console.log("FOUND USER:", user);

    if (!user) {

      return res.status(400).json({
        message: "Invalid credentials"
      });

    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid credentials"
      });

    }

    console.log("JWT SECRET:", process.env.JWT_SECRET);

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("TOKEN GENERATED");

    res.json({
      message: "Login successful",
      token
    });

  } catch (err) {

    console.log("LOGIN ERROR:");
    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }

});
module.exports = router;