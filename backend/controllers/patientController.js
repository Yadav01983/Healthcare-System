const Patient = require("../models/Patient");

//  CREATE PATIENT 
const createPatient = async (req, res) => {
  try {
    const { name, age, email, phone } = req.body;

    const patient = await Patient.create({
      name,
      age,
      email,
      phone
    });

    res.status(201).json({
      message: "Patient created successfully",
      patient,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//  COUNT PATIENTS
const getPatientCount = async (req, res) => {
  try {
    console.log("🔥 COUNT API CALLED"); 

    const count = await Patient.countDocuments({});
    
    console.log("Total Patients:", count);

    res.status(200).json({
      totalPatients: count
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//  GET ALL PATIENTS 
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  DELETE PATIENT 
const deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Patient deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  UPDATE PATIENT 
const updatePatient = async (req, res) => {
  try {
    const { name, age, email, phone } = req.body;

    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      {
        name,
        age,
        email,
        phone
      },
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({
      message: "Patient updated successfully",
      updatedPatient,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPatient,
  getPatients,
  deletePatient,
  updatePatient,
  getPatientCount
};