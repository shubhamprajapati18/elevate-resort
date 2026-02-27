const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");
const auth = require("../middleware/auth");
const { v4: uuidv4 } = require("uuid");

// @route   GET api/rooms
// @desc    Get all rooms
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { data: rooms, error } = await supabase.from("rooms").select("*");

    if (error) throw error;
    res.json(rooms);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/rooms
// @desc    Add a new room
// @access  Private (Admin)
router.post("/", auth, async (req, res) => {
  const { title, description, price, image, amenities, type } = req.body;

  if (!title || !description || !price || !image) {
    return res.status(400).json({ msg: "Please enter all required fields" });
  }

  if (isNaN(price) || Number(price) <= 0) {
    return res.status(400).json({ msg: "Price must be a positive number" });
  }

  try {
    const { data: room, error } = await supabase
      .from("rooms")
      .insert([
        { id: uuidv4(), title, description, price, image, amenities, type },
      ])
      .select()
      .single();

    if (error) throw error;
    res.json(room);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/rooms/:id
// @desc    Update a room
// @access  Private (Admin)
router.put("/:id", auth, async (req, res) => {
  const { title, description, price, image, amenities, type } = req.body;

  if (price && (isNaN(price) || Number(price) <= 0)) {
    return res.status(400).json({ msg: "Price must be a positive number" });
  }

  try {
    const { data: existing, error: findError } = await supabase
      .from("rooms")
      .select("id")
      .eq("id", req.params.id)
      .single();

    if (findError || !existing)
      return res.status(404).json({ msg: "Room not found" });

    const { data: room, error: updateError } = await supabase
      .from("rooms")
      .update({ title, description, price, image, amenities, type })
      .eq("id", req.params.id)
      .select()
      .single();

    if (updateError) throw updateError;
    res.json(room);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/rooms/:id
// @desc    Delete a room
// @access  Private (Admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    const { data: existing, error: findError } = await supabase
      .from("rooms")
      .select("id")
      .eq("id", req.params.id)
      .single();

    if (findError || !existing)
      return res.status(404).json({ msg: "Room not found" });

    const { error: deleteError } = await supabase
      .from("rooms")
      .delete()
      .eq("id", req.params.id);

    if (deleteError) throw deleteError;
    res.json({ msg: "Room removed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
