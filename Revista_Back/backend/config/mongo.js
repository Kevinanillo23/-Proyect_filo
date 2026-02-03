const mongoose = require("mongoose");
const config = require("./config");


const connectMongoDB = async () => {
  const atlasURI = config.mongodb.uri;
  const localURI = "mongodb://127.0.0.1:27017/revista";


  try {
    console.log("⏳ Connecting to MongoDB Atlas...");
    await mongoose.connect(atlasURI, { serverSelectionTimeoutMS: 5000 });
    console.log("✅ MongoDB Connected: Atlas (Cloud)");
  } catch (err) {
    console.warn("❌ MongoDB Atlas Failed:", err.message);
    console.log("🔄 Falling back to Local MongoDB...");

    try {
      await mongoose.connect(localURI);
      console.log("✅ MongoDB Connected: Localhost");
    } catch (localErr) {
      console.error("❌ Critical: Local MongoDB also failed!", localErr.message);
    }
  }
};

module.exports = connectMongoDB;
