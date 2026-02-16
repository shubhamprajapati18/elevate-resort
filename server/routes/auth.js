const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const auth = require("../middleware/auth");

// @route   POST api/auth/login
// @desc    Authenticate admin & get token
// @access  Public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    let admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      admin: {
        id: admin.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      },
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/auth/user
// @desc    Get logged in admin
// @access  Private
router.get("/user", auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/auth/seed
// @desc    Seed initial admin (Run once)
// @access  Public (Should be protected or removed in prod)
router.post("/seed", async (req, res) => {
  try {
    const { username, password } = req.body;

    let admin = await Admin.findOne({ username });
    if (admin) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    admin = new Admin({
      username,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);

    await admin.save();
    res.send("Admin User Created");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
