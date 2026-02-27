const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// No local db init script right now, database handles requests via `supabaseClient` directly on routes.

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/inquiries", require("./routes/inquiries"));
app.use("/api/rooms", require("./routes/rooms"));
app.use("/api/gallery", require("./routes/gallery"));
app.use("/api/testimonials", require("./routes/testimonials"));
app.use("/api/content", require("./routes/content"));
app.use("/api/upload", require("./routes/upload"));

app.get("/", (req, res) => {
  res.send("Elevate Resort API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
