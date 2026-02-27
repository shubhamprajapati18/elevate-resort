const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");
const auth = require("../middleware/auth");
const { v4: uuidv4 } = require("uuid");

// @route   GET api/content/:sectionId
// @desc    Get content by section ID
// @access  Public
router.get("/:sectionId", async (req, res) => {
  try {
    const { data: content, error } = await supabase
      .from("content")
      .select("*")
      .eq("sectionId", req.params.sectionId)
      .single();

    if (error || !content)
      return res.status(404).json({ msg: "Content not found" });

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
    const { data: existingContent } = await supabase
      .from("content")
      .select("id")
      .eq("sectionId", sectionId)
      .single();

    if (existingContent) {
      // Update
      const { data: updatedContent, error: updateError } = await supabase
        .from("content")
        .update({ title, subtitle, body, images, isVisible })
        .eq("sectionId", sectionId)
        .select()
        .single();

      if (updateError) throw updateError;
      return res.json(updatedContent);
    }

    // Create
    const { data: newContent, error: insertError } = await supabase
      .from("content")
      .insert([
        { id: uuidv4(), sectionId, title, subtitle, body, images, isVisible },
      ])
      .select()
      .single();

    if (insertError) throw insertError;
    res.json(newContent);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
