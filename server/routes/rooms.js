const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const auth = require("../middleware/auth");

// @route   GET api/rooms
// @desc    Get all rooms
// @access  Public
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/rooms
// @desc    Add a new room
// @access  Private (Admin)
router.post("/", auth, async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    const room = await newRoom.save();
    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/rooms/:id
// @desc    Update a room
// @access  Private (Admin)
router.put("/:id", auth, async (req, res) => {
  try {
    let room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ msg: "Room not found" });

    room = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/rooms/:id
// @desc    Delete a room
// @access  Private (Admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    let room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ msg: "Room not found" });

    await Room.findByIdAndDelete(req.params.id);
    res.json({ msg: "Room removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
