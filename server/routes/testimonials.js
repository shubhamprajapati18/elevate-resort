const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");
const auth = require("../middleware/auth");
const { v4: uuidv4 } = require("uuid");

// @route   GET api/testimonials
// @desc    Get all testimonials
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { data: testimonials, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;
    res.json(testimonials);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/testimonials
// @desc    Add a new testimonial
// @access  Private (Admin)
router.post("/", auth, async (req, res) => {
  try {
    const { name, rating, text } = req.body;
    const { data: testimonial, error } = await supabase
      .from("testimonials")
      .insert([
        { id: uuidv4(), name, rating, text, date: new Date().toISOString() },
      ])
      .select()
      .single();

    if (error) throw error;
    res.json(testimonial);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/testimonials/:id
// @desc    Delete a testimonial
// @access  Private (Admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    const { data: existing, error: findError } = await supabase
      .from("testimonials")
      .select("id")
      .eq("id", req.params.id)
      .single();

    if (findError || !existing)
      return res.status(404).json({ msg: "Testimonial not found" });

    const { error: deleteError } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", req.params.id);

    if (deleteError) throw deleteError;
    res.json({ msg: "Testimonial removed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
