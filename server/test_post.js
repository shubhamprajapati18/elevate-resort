const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function test() {
  const token = jwt.sign(
    { admin: { id: "test-admin" } },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  try {
    const res = await axios.post(
      "http://localhost:5000/api/gallery",
      {
        url: "http://example.com/test.png",
        category: "Other",
        caption: "Test",
      },
      {
        headers: { "x-auth-token": token, "Content-Type": "application/json" },
      },
    );
    console.log("Success:", res.data);
  } catch (err) {
    console.error("Error Status:", err.response?.status);
    console.log("Error Data:", err.response?.data);
    console.log("Error Msg:", err.message);
  }
}
test();
