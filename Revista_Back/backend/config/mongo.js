const mongoose = require("mongoose");
const config = require("./config");

const connectMongoDB = async () => {
  const atlasURI = config.mongodb.uri;
  const localURI = "mongodb://127.0.0.1:27017/revista";

  try {
    // Attempting Cloud connection first
    await mongoose.connect(atlasURI, { serverSelectionTimeoutMS: 5000 });
    console.info("MongoDB connection established [Atlas]");
  } catch (err) {
    console.warn("MongoDB Atlas unreachable, attempting local fallback...");

    try {
      await mongoose.connect(localURI);
      console.info("MongoDB connection established [Local]");
    } catch (localErr) {
      console.error("Critical: All MongoDB connection attempts failed.", localErr.message);
    }
  }
};

module.exports = connectMongoDB;
