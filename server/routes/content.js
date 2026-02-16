const express = require("express");
const router = express.Router();
const Content = require("../models/Content");
const auth = require("../middleware/auth");

// @route   GET api/content/:sectionId
// @desc    Get content by section ID
// @access  Public
router.get("/:sectionId", async (req, res) => {
  try {
    const content = await Content.findOne({ sectionId: req.params.sectionId });
    if (!content) return res.status(404).json({ msg: "Content not found" });
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/content
// @desc    Create or Update content
// @access  Private (Admin)
router.post("/", auth, async (req, res) => {
  const { sectionId, title, subtitle, body, images, isVisible } = req.body;

  try {
    let content = await Content.findOne({ sectionId });

    if (content) {
      // Update
      content = await Content.findOneAndUpdate(
        { sectionId },
        { $set: { title, subtitle, body, images, isVisible } },
        { new: true },
      );
      return res.json(content);
    }

    // Create
    content = new Content({
      sectionId,
      title,
      subtitle,
      body,
      images,
      isVisible,
    });

    await content.save();
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
