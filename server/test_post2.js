const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function test() {
  const secret = process.env.JWT_SECRET || "supersecretkey123";
  const token = jwt.sign({ admin: { id: "test-admin" } }, secret, {
    expiresIn: "10h",
  });

  console.log("Using Token:", token);

  try {
    const res = await axios.post(
      "http://127.0.0.1:5000/api/gallery",
      {
        url: "http://example.com/test.png",
        category: "Other",
        caption: "Test Caption",
      },
      {
        headers: { "x-auth-token": token, "Content-Type": "application/json" },
      },
    );
    console.log("Success HTTP 200:", res.data);
  } catch (err) {
    console.error("Caught Exception:", err.message);
    if (err.response) {
      console.log("Error Status:", err.response.status);
      console.log("Error Data:", err.response.data);
    }
  }
}
test();
