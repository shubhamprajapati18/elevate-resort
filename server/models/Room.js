const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  amenities: [String],
  image: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Executive", "Bridal", "Cottage", "Other"],
    default: "Other",
  },
});

module.exports = mongoose.model("Room", RoomSchema);
