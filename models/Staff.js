import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    staffId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    dateOfJoining: {
      type: Date,
      default: Date.now,
    },
    salary: {
      type: Number,
    },
    qualification: {
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
    documents: [
      {
        name: String,
        path: String,
        uploadDate: Date,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Staff", staffSchema);
