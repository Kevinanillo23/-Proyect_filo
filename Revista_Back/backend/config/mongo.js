const mongoose = require("mongoose");
require("dotenv").config();

const connectMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/revista";

    // Mongoose 6+ default options are already optimal.
    // Explicitly handling connection events is often better for robust apps.

    await mongoose.connect(mongoURI);

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    // In production, you might want to exit process, but for dev we continue
    // process.exit(1);
  }
};

module.exports = connectMongoDB;
