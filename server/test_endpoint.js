const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

async function testUpload() {
  try {
    const formData = new FormData();
    const imagePath = path.join(__dirname, "../client/src/assets/Scene6.png");
    // Read the whole buffer into memory
    const buffer = fs.readFileSync(imagePath);
    formData.append("image", buffer, {
      filename: "Scene6.png",
      contentType: "image/png",
    });

    const res = await axios.post("http://localhost:5000/api/upload", formData, {
      headers: formData.getHeaders(),
    });
    console.log("Success:", res.data);
  } catch (err) {
    console.error("Error Status:", err.response?.status);
    console.log("Error Data:", err.response?.data);
    console.log(err.response?.data?.msg || err.message);
  }
}
testUpload();
