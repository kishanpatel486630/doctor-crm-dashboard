import mongoose from "mongoose";

const serviceProductSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["service", "product"],
      required: true,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number, // for services (in minutes)
    },
    stock: {
      type: Number, // for products
      default: 0,
    },
    image: {
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

export default mongoose.model("ServiceProduct", serviceProductSchema);
