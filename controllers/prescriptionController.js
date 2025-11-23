import Prescription from "../models/Prescription.js";

export const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate("patient", "firstName lastName patientId")
      .populate("doctor", "fullName email")
      .populate("appointment")
      .sort({ createdAt: -1 });
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("patient")
      .populate("doctor", "-password")
      .populate("appointment");

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createPrescription = async (req, res) => {
  try {
    // Generate unique prescription ID
    const count = await Prescription.countDocuments();
    const prescriptionId = `RX${String(count + 1).padStart(5, "0")}`;

    const prescription = new Prescription({
      ...req.body,
      prescriptionId,
    });

    await prescription.save();

    const populatedPrescription = await Prescription.findById(prescription._id)
      .populate("patient", "firstName lastName patientId")
      .populate("doctor", "fullName email");

    res
      .status(201)
      .json({
        message: "Prescription created successfully",
        prescription: populatedPrescription,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updatePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate("patient", "firstName lastName patientId")
      .populate("doctor", "fullName email");

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.json({ message: "Prescription updated successfully", prescription });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.json({ message: "Prescription deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getPrescriptionsByPatient = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      patient: req.params.patientId,
    })
      .populate("doctor", "fullName email")
      .sort({ createdAt: -1 });
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
