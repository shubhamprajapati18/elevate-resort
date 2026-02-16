const axios = require("axios");

const API_URL = "http://localhost:5000/api";

const runTest = async () => {
  try {
    // 1. Post an Inquiry (Public)
    console.log("1. Submitting Inquiry...");
    const inquiryData = {
      name: "Test User",
      email: "test@example.com",
      phone: "1234567890",
      eventType: "Wedding",
      guests: 100,
      message: "This is a test inquiry.",
    };
    await axios.post(`${API_URL}/inquiries`, inquiryData);
    console.log("✅ Inquiry Submitted");

    // 2. Login as Admin
    console.log("2. Logging in as Admin...");
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      username: "admin",
      password: "password123",
    });
    const token = loginRes.data.token;
    console.log("✅ Logged in. Token received.");

    // 3. Fetch Inquiries (Admin)
    console.log("3. Fetching Inquiries...");
    const inquiriesRes = await axios.get(`${API_URL}/inquiries`, {
      headers: { "x-auth-token": token },
    });

    console.log(`✅ Inquiries Fetched. Count: ${inquiriesRes.data.length}`);
    const latestInquiry = inquiriesRes.data[0];
    if (
      latestInquiry.name === inquiryData.name &&
      latestInquiry.email === inquiryData.email
    ) {
      console.log("✅ Verified: Latest inquiry matches submission.");
    } else {
      console.log("❌ Error: Latest inquiry does not match.");
      console.log("Latest:", latestInquiry);
    }
  } catch (err) {
    console.error(
      "❌ Test Failed:",
      err.response ? err.response.data : err.message,
    );
  }
};

runTest();
