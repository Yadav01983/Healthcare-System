const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//  LOAD ENV
dotenv.config();

// INIT APP 
const app = express();

//  MIDDLEWARE
app.use(cors());
app.use(express.json());
// ROUTES 
const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const doctorRoutes = require("./routes/doctorRoutes");

// API ROUTES
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorRoutes);

//  ROOT 
app.get("/", (req, res) => {
  res.send("🚀 Healthcare API is running...");
});

//  ERROR HANDLING 
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: "Server Error" });
});

//  SERVER START 
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); 

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server failed to start:", error);
  }
};

startServer();