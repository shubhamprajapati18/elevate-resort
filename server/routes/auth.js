const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const supabase = require("../supabaseClient");
const auth = require("../middleware/auth");
const { v4: uuidv4 } = require("uuid");

// @route   POST api/auth/login
// @desc    Authenticate admin & get token
// @access  Public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const { data: admin, error } = await supabase
      .from("admins")
      .select("*")
      .eq("username", username)
      .single();

    if (error || !admin) {
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
      { expiresIn: "7d" },
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
    const { data: admin, error } = await supabase
      .from("admins")
      .select("id, username")
      .eq("id", req.admin.id)
      .single();

    if (error || !admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

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

    // Check if user exists
    const { data: existingAdmin } = await supabase
      .from("admins")
      .select("id")
      .eq("username", username)
      .single();

    if (existingAdmin) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data, error } = await supabase
      .from("admins")
      .insert([{ id: uuidv4(), username, password: hashedPassword }]);

    if (error) {
      console.error(error);
      return res.status(500).send("Supabase Insert Error");
    }

    res.send("Admin User Created");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
