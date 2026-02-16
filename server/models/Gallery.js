const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Weddings", "Accommodation", "Pool", "Events", "Other"],
    default: "Other",
  },
  caption: {
    type: String,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Gallery", GallerySchema);
