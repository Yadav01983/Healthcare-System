const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    //  BASIC INFO 
    name: {
      type: String,
      required: true,
      trim: true 
    },

    specialization: {
      type: String,
      required: true,
      trim: true
    },

    //  PROFESSIONAL INFO 
    experience: {
      type: Number,
      required: true,
      min: 0 
    },

    fees: {
      type: Number,
      required: true,
      min: 0
    },

    //  CONTACT 
    phone: {
      type: String,
      trim: true
    },

    //  STATUS
    available: {
      type: Boolean,
      default: true
    }

  },
  {
    timestamps: true 
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);