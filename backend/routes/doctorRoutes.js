const express = require("express");
const router = express.Router();

const {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getDoctorCount // 🔥 ADD THIS
} = require("../controllers/doctorController");

// 🔐 AUTH MIDDLEWARE
const protect = require("../middleware/authMiddleware");

// ================= ROUTES =================

router.get("/count", protect, getDoctorCount); 

// ✅ GET SINGLE DOCTOR
router.get("/:id", protect, getDoctorById);

// ✅ GET ALL DOCTORS
router.get("/", protect, getDoctors);

// ✅ CREATE DOCTOR
router.post("/", protect, createDoctor);

// ✅ UPDATE DOCTOR
router.put("/:id", protect, updateDoctor);

// ✅ DELETE DOCTOR
router.delete("/:id", protect, deleteDoctor);


module.exports = router;