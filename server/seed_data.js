const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Room = require("./models/Room");
const Gallery = require("./models/Gallery");
const Testimonial = require("./models/Testimonial");
const Admin = require("./models/Admin");
const bcrypt = require("bcryptjs");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected for Seeding");

    // Clear existing data
    await Room.deleteMany({});
    await Gallery.deleteMany({});
    await Testimonial.deleteMany({});
    await Admin.deleteMany({});

    // Seed Admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    const admin = new Admin({
      username: "admin",
      password: hashedPassword,
    });
    await admin.save();
    console.log("Admin User Seeded (admin/password123)");

    // Seed Rooms
    const rooms = [
      {
        title: "Executive Room",
        description:
          "Modern interiors designed for corporate guests and travelers seeking comfort. Features a work desk and premium bedding.",
        price: "₹4,500 / Night",
        image:
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        amenities: ["King Size Bed", "Work Desk", "City View"],
        type: "Executive",
      },
      {
        title: "Bridal Suite",
        description:
          "A luxurious suite crafted for the bride and groom. Includes huge mirrors, vanity spaces, and a luxury bathtub.",
        price: "₹12,000 / Night",
        image:
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        amenities: ["Luxury Tub", "Vanity Station", "Lounge Area"],
        type: "Bridal",
      },
      {
        title: "Family Cottage",
        description:
          "Spacious garden-facing private units perfect for families. Enjoy privacy and nature right at your doorstep.",
        price: "₹8,000 / Night",
        image:
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        amenities: ["2 Queen Beds", "Garden View", "Private Sit-out"],
        type: "Cottage",
      },
    ];
    await Room.insertMany(rooms);
    console.log("Rooms Seeded");

    // Seed Gallery
    const gallery = [
      {
        category: "Weddings",
        url: "https://images.unsplash.com/photo-1519225421980-715cb0202128?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        caption: "Wedding Lawn",
      },
      {
        category: "Pool",
        url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        caption: "Swimming Pool",
      },
      {
        category: "Accommodation",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        caption: "Executive Room",
      },
      {
        category: "Events",
        url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        caption: "Fashion Show",
      },
    ];
    await Gallery.insertMany(gallery);
    console.log("Gallery Seeded");

    // Seed Testimonials
    const testimonials = [
      {
        name: "Dr. Rajesh Gupta",
        role: "Wedding Host",
        image:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
        text: "Hosting my daughter's wedding at Elevate Resort was the best decision. The 2500+ capacity lawn was perfect, and the hospitality was unmatched.",
      },
      {
        name: "Priya Sharma",
        role: "Staycation Guest",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
        text: "An absolute gem! The swimming pool is pristine and the rooms are luxurious. The staff made us feel like royalty.",
      },
    ];
    await Testimonial.insertMany(testimonials);
    console.log("Testimonials Seeded");

    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
