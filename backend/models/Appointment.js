const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: false,
    },

    // DATE
    date: {
      type: Date,
      required: true,
    },

    // TIME
    time: {
      type: String,
      required: true,
    },

    //  REASON 
    reason: {
      type: String,
      default: "",
    },

    // 📊 STATUS (CONTROLLED VALUES)
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);