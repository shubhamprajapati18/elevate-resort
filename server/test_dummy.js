const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

async function testUpload() {
  try {
    const formData = new FormData();
    const imagePath = path.join(__dirname, "dummy.png");
    fs.writeFileSync(imagePath, "dummy data inside png"); // Will fail if checkFileType checks mime from content, but checkFileType only uses req.file.mimetype from formData header

    // multer only relies on file.originalname and file.mimetype
    formData.append("image", fs.createReadStream(imagePath), {
      filename: "dummy.png",
      contentType: "image/png",
    });

    const res = await axios.post("http://localhost:5000/api/upload", formData, {
      headers: formData.getHeaders(),
    });
    console.log("Success:", res.data);
  } catch (err) {
    console.error("Error Status:", err.response?.status);
    console.log("Error Msg:", err.response?.data?.msg || err.message);
  }
}
testUpload();
