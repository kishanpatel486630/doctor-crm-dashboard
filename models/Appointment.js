import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    appointmentId: {
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
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 30, // minutes
    },
    type: {
      type: String,
      enum: ["consultation", "follow-up", "emergency", "routine-checkup"],
      default: "consultation",
    },
    status: {
      type: String,
      enum: [
        "scheduled",
        "confirmed",
        "in-progress",
        "completed",
        "cancelled",
        "no-show",
      ],
      default: "scheduled",
    },
    reason: {
      type: String,
    },
    notes: {
      type: String,
    },
    prescription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Appointment", appointmentSchema);
