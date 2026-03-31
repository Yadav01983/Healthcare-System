const Appointment = require("../models/Appointment");

//  CREATE APPOINTMENT 
const createAppointment = async (req, res) => {
  try {
    const { patient, doctor, date, time, reason } = req.body;

    if (!patient || !date || !time) {
      return res.status(400).json({ message: "Patient, date and time are required" });
    }

    const appointment = await Appointment.create({
      patient,
      doctor,
      date,
      time,
      reason
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//  GET ALL APPOINTMENTS 
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email phone")
      .populate("doctor", "name");

    res.status(200).json(appointments);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE APPOINTMENT 
const updateAppointment = async (req, res) => {
  try {
    const { status, date, time, reason } = req.body;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status,
        date,
        time,
        reason
      },
      { new: true }
    );

    res.status(200).json({
      message: "Appointment updated successfully",
      appointment: updatedAppointment
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//  DELETE APPOINTMENT 
const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Appointment deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// TOTAL COUNT 
const getAppointmentCount = async (req, res) => {
  try {
    const count = await Appointment.countDocuments();

    res.status(200).json({
      totalAppointments: count
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// STATUS ANALYTICS 
const getAppointmentStats = async (req, res) => {
  try {
    const total = await Appointment.countDocuments();
    const pending = await Appointment.countDocuments({ status: "Pending" });
    const completed = await Appointment.countDocuments({ status: "Completed" });
    const cancelled = await Appointment.countDocuments({ status: "Cancelled" });

    res.status(200).json({
      total,
      pending,
      completed,
      cancelled
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  getAppointmentCount,
  getAppointmentStats 
};