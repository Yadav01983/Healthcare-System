const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB..."); 

    await mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 500000
});

    console.log("MongoDB Atlas connected ");
  } catch (error) {
    console.error("Database connection failed :", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;