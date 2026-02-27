const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB Connected");

    const username = "admin";
    const password = "password123";

    try {
      let admin = await Admin.findOne({ username });
      if (admin) {
        console.log("Admin already exists");
        process.exit();
      }

      admin = new Admin({
        username,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);

      await admin.save();
      console.log("Admin User Created");
      process.exit();
    } catch (err) {
      console.error("DB Seed Error:", err);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.log("Mongo Connect Error:", err);
    process.exit(1);
  });
