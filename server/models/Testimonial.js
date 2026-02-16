const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Testimonial", TestimonialSchema);
