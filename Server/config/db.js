const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/toursDB";
    await mongoose.connect(mongoUri);
    console.log("✓ MongoDB connected successfully at", mongoUri);
  } catch (error) {
    console.error("✗ DB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;