const express = require("express");
const router = express.Router();

//Import Controllers
const {
  createPatient,
  getPatients,
  deletePatient,
  updatePatient,
  getPatientCount 
} = require("../controllers/patientController");
// ✅ Auth Middleware
const protect = require("../middleware/authMiddleware");

// ================= ROUTES =================

// GET all patients
router.get("/", protect, getPatients);

// CREATE patient
router.post("/", protect, createPatient);

// UPDATE patient
router.put("/:id", protect, updatePatient);

// DELETE patient
router.delete("/:id", protect, deletePatient);
router.get("/count", protect, getPatientCount); 

module.exports = router;