import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    leadId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
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
    source: {
      type: String,
      enum: [
        "website",
        "referral",
        "social-media",
        "walk-in",
        "phone",
        "other",
      ],
      default: "other",
    },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "converted", "lost"],
      default: "new",
    },
    interest: {
      type: String,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    followUpDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
    convertedToPatient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Lead", leadSchema);
