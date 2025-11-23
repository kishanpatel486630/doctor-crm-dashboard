import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    bloodGroup: {
      type: String,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    emergencyContact: {
      name: String,
      relation: String,
      phone: String,
    },
    medicalHistory: {
      allergies: [String],
      chronicConditions: [String],
      currentMedications: [String],
      pastSurgeries: [String],
    },
    documents: [
      {
        name: String,
        path: String,
        uploadDate: Date,
      },
    ],
    notes: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Patient", patientSchema);
