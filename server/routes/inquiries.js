const express = require("express");
const router = express.Router();
const Inquiry = require("../models/Inquiry");
const auth = require("../middleware/auth");

// @route   POST api/inquiries
// @desc    Submit a new inquiry (Public)
// @access  Public
router.post("/", async (req, res) => {
  try {
    const newInquiry = new Inquiry(req.body);
    const inquiry = await newInquiry.save();
    res.json(inquiry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/inquiries
// @desc    Get all inquiries
// @access  Private (Admin)
router.get("/", auth, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ date: -1 });
    res.json(inquiries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/inquiries/:id
// @desc    Get inquiry by ID
// @access  Private (Admin)
router.get("/:id", auth, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ msg: "Inquiry not found" });
    }
    res.json(inquiry);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Inquiry not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/inquiries/:id
// @desc    Update inquiry status
// @access  Private (Admin)
router.put("/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ msg: "Inquiry not found" });
    }

    inquiry.status = status;
    await inquiry.save();
    res.json(inquiry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/inquiries/:id
// @desc    Delete inquiry
// @access  Private (Admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ msg: "Inquiry not found" });
    }

    await inquiry.deleteOne();

    res.json({ msg: "Inquiry removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Inquiry not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
