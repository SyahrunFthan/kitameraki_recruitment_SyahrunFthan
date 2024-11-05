const mongoose = require("mongoose");
require("dotenv").config();

// Connection To MongoDB
const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected....");
  } catch (error) {
    console.log("Database Not Connect: ", error.message);
  }
};

module.exports = db;
