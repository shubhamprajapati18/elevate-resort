const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");
const auth = require("../middleware/auth");
const { v4: uuidv4 } = require("uuid");

// @route   GET api/gallery
// @desc    Get all gallery images
// @access  Public
router.get("/", async (req, res) => {
  try {
    // Note: Supabase orders by datetime via order() rather than .sort()
    const { data: images, error } = await supabase
      .from("gallery")
      .select("*")
      .order("dateAdded", { ascending: false });

    if (error) throw error;
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/gallery
// @desc    Add a new image
// @access  Private (Admin)
router.post("/", auth, async (req, res) => {
  try {
    const { url, category, caption } = req.body;
    const { data: image, error } = await supabase
      .from("gallery")
      .insert([
        {
          id: uuidv4(),
          url,
          category,
          caption,
          dateAdded: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    res.json(image);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/gallery/:id
// @desc    Delete an image
// @access  Private (Admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    const { data: image, error: findError } = await supabase
      .from("gallery")
      .select("id")
      .eq("id", req.params.id)
      .single();

    if (findError || !image)
      return res.status(404).json({ msg: "Image not found" });

    const { error: deleteError } = await supabase
      .from("gallery")
      .delete()
      .eq("id", req.params.id);

    if (deleteError) throw deleteError;
    res.json({ msg: "Image removed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
