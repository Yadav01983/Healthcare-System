const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  email: {
    type: String
  },
  phone: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Patient", patientSchema);