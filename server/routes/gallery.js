const express = require("express");
const router = express.Router();
const Gallery = require("../models/Gallery");
const auth = require("../middleware/auth");

// @route   GET api/gallery
// @desc    Get all gallery images
// @access  Public
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ dateAdded: -1 });
    res.json(images);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/gallery
// @desc    Add a new image
// @access  Private (Admin)
router.post("/", auth, async (req, res) => {
  try {
    const newImage = new Gallery(req.body);
    const image = await newImage.save();
    res.json(image);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/gallery/:id
// @desc    Delete an image
// @access  Private (Admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    let image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ msg: "Image not found" });

    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ msg: "Image removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
