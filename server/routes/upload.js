const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const fs = require("fs");

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Use disk storage to avoid out of memory crashes for large files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 50000000 }, // 50MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image"); // Field name 'image'

// Check File Type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// @route   POST api/upload
// @desc    Upload an image
// @access  Public (should probably be private in prod, but keeping simple)
router.post("/", (req, res) => {
  console.log("---- INCOMING UPLOAD REQUEST ----");
  console.log("Headers:", req.headers);
  upload(req, res, async (err) => {
    console.log("Multer finished. Error:", err);
    console.log("File:", req.file);
    if (err) {
      console.error("Multer upload error:", err);
      return res.status(400).json({ msg: err.message || err });
    }
    if (req.file == undefined) {
      return res.status(400).json({ msg: "No File Selected" });
    }

    try {
      const fileName = req.file.filename;

      // Read file from disk
      const fileBuffer = fs.readFileSync(req.file.path);

      // Upload to Supabase 'images' bucket
      const { data, error } = await supabase.storage
        .from("images")
        .upload(fileName, fileBuffer, {
          contentType: req.file.mimetype,
          cacheControl: "3600",
          upsert: false,
        });

      // Delete the temp file from disk to save space
      fs.unlinkSync(req.file.path);

      if (error) {
        console.error(
          "Supabase Upload Error object details:",
          JSON.stringify(error, null, 2),
        );
        return res.status(500).json({ msg: "Error uploading to Supabase" });
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(fileName);

      res.json({
        filePath: publicUrl,
        fileName: fileName,
      });
    } catch (uploadError) {
      console.error(uploadError);
      res.status(500).json({ msg: "Server error during upload" });
    }
  });
});

module.exports = router;
