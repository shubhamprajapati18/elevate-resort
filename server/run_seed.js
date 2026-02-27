const axios = require("axios");

async function seed() {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/seed", {
      username: "admin",
      password: "password123",
    });
    console.log("SUCCESS:", res.data);
  } catch (err) {
    console.error("ERROR:", err.response ? err.response.data : err.message);
  }
}

seed();
