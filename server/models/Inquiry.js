const mongoose = require("mongoose");

const InquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    default: "General",
  },
  guests: {
    type: Number,
  },
  message: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["New", "Read", "Contacted"],
    default: "New",
  },
});

module.exports = mongoose.model("Inquiry", InquirySchema);
