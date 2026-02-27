const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");
const auth = require("../middleware/auth");
const { v4: uuidv4 } = require("uuid");

// @route   POST api/inquiries
// @desc    Submit a new inquiry (Public)
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, eventType, guests, message } = req.body;

    // Default guest count to 0 if left blank or NaN
    const parsedGuests = guests && !isNaN(guests) ? Number(guests) : 0;

    // We send `date` as today's date so it matches the db schema, but `date_created` is also there.
    const { data: inquiry, error } = await supabase
      .from("inquiries")
      .insert([
        {
          id: uuidv4(),
          name,
          email,
          phone,
          eventType,
          date: new Date().toLocaleDateString("en-GB"),
          guests: parsedGuests,
          message,
          status: "Pending",
        },
      ])
      .select()
      .single();

    if (error) throw error;
    res.json(inquiry);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/inquiries
// @desc    Get all inquiries
// @access  Private (Admin)
router.get("/", auth, async (req, res) => {
  try {
    const { data: inquiries, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("date_created", { ascending: false });

    if (error) throw error;
    res.json(inquiries);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/inquiries/:id
// @desc    Get inquiry by ID
// @access  Private (Admin)
router.get("/:id", auth, async (req, res) => {
  try {
    const { data: inquiry, error } = await supabase
      .from("inquiries")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (error || !inquiry) {
      return res.status(404).json({ msg: "Inquiry not found" });
    }

    res.json(inquiry);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/inquiries/:id
// @desc    Update inquiry status
// @access  Private (Admin)
router.put("/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;

    // Check if inquiry exists
    const { data: existing, error: findError } = await supabase
      .from("inquiries")
      .select("id")
      .eq("id", req.params.id)
      .single();

    if (findError || !existing) {
      return res.status(404).json({ msg: "Inquiry not found" });
    }

    // Update
    const { data: inquiry, error: updateError } = await supabase
      .from("inquiries")
      .update({ status })
      .eq("id", req.params.id)
      .select()
      .single();

    if (updateError) throw updateError;
    res.json(inquiry);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/inquiries/:id
// @desc    Delete inquiry
// @access  Private (Admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    // Check if inquiry exists
    const { data: existing, error: findError } = await supabase
      .from("inquiries")
      .select("id")
      .eq("id", req.params.id)
      .single();

    if (findError || !existing) {
      return res.status(404).json({ msg: "Inquiry not found" });
    }

    // Delete
    const { error: deleteError } = await supabase
      .from("inquiries")
      .delete()
      .eq("id", req.params.id);

    if (deleteError) throw deleteError;

    res.json({ msg: "Inquiry removed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
