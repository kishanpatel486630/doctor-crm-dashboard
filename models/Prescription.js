import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    prescriptionId: {
      type: String,
      required: true,
      unique: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    diagnosis: {
      type: String,
    },
    symptoms: [String],
    medications: [
      {
        name: {
          type: String,
          required: true,
        },
        dosage: {
          type: String,
          required: true,
        },
        frequency: {
          type: String,
          required: true,
        },
        duration: {
          type: String,
          required: true,
        },
        instructions: String,
      },
    ],
    tests: [
      {
        name: String,
        instructions: String,
      },
    ],
    advice: {
      type: String,
    },
    followUpDate: {
      type: Date,
    },
    attachments: [
      {
        name: String,
        path: String,
        uploadDate: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Prescription", prescriptionSchema);
