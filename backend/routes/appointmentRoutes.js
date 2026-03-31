const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  getAppointmentCount,   
  getAppointmentStats    
} = require("../controllers/appointmentController");

//  AUTH MIDDLEWARE
const protect = require("../middleware/authMiddleware");

//  ROUTES

// ✅ COUNT
router.get("/count", protect, getAppointmentCount);

// ✅ STATUS ANALYTICS
router.get("/stats", protect, getAppointmentStats);

// ✅ CREATE
router.post("/", protect, createAppointment);

// ✅ GET ALL
router.get("/", protect, getAppointments);

// ✅ UPDATE
router.put("/:id", protect, updateAppointment);

// ✅ DELETE
router.delete("/:id", protect, deleteAppointment);

module.exports = router;