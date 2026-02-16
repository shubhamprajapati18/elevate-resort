const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  sectionId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  body: {
    type: String,
  },
  images: [String],
  isVisible: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Content", ContentSchema);
