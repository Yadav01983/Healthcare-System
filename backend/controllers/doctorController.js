const Doctor = require("../models/Doctor");

//  CREATE DOCTOR 
const createDoctor = async (req, res) => {
  try {
    const { name, specialization, experience, fees, phone, available } = req.body;

    
    if (!name || !specialization || experience === undefined || fees === undefined) {
      return res.status(400).json({
        message: "Name, specialization, experience and fees are required"
      });
    }

    const doctor = await Doctor.create({
      name,
      specialization,
      experience,
      fees,
      phone,
      available
    });

    res.status(201).json({
      message: "Doctor created successfully",
      doctor
    });

  } catch (error) {
    console.error("Create Doctor Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL DOCTORS 
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });

    res.status(200).json(doctors);

  } catch (error) {
    console.error("Get Doctors Error:", error);
    res.status(500).json({ message: error.message });
  }
};

//  GET SINGLE DOCTOR 
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);

  } catch (error) {
    console.error("Get Doctor By ID Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE DOCTOR 
const updateDoctor = async (req, res) => {
  try {
    const { name, specialization, experience, fees, phone, available } = req.body;

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      {
        name,
        specialization,
        experience,
        fees,
        phone,
        available
      },
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({
      message: "Doctor updated successfully",
      doctor: updatedDoctor
    });

  } catch (error) {
    console.error("Update Doctor Error:", error);
    res.status(500).json({ message: error.message });
  }
};

//  DELETE DOCTOR 
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor deleted successfully" });

  } catch (error) {
    console.error("Delete Doctor Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// COUNT DOCTORS 
const getDoctorCount = async (req, res) => {
  try {
    const count = await Doctor.countDocuments();

    res.status(200).json({
      totalDoctors: count
    });

  } catch (error) {
    console.error("Doctor Count Error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getDoctorCount 
};