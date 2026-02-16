const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");
const auth = require("../middleware/auth");

// @route   GET api/testimonials
// @desc    Get all testimonials
// @access  Public
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/testimonials
// @desc    Add a new testimonial
// @access  Private (Admin)
router.post("/", auth, async (req, res) => {
  try {
    const newTestimonial = new Testimonial(req.body);
    const testimonial = await newTestimonial.save();
    res.json(testimonial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/testimonials/:id
// @desc    Delete a testimonial
// @access  Private (Admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    let testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial)
      return res.status(404).json({ msg: "Testimonial not found" });

    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ msg: "Testimonial removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
