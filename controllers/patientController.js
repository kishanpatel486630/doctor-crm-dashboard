import Patient from "../models/Patient.js";

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ isActive: true }).sort({
      createdAt: -1,
    });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createPatient = async (req, res) => {
  try {
    // Generate unique patient ID
    const count = await Patient.countDocuments();
    const patientId = `P${String(count + 1).padStart(5, "0")}`;

    const patient = new Patient({
      ...req.body,
      patientId,
    });

    await patient.save();
    res.status(201).json({ message: "Patient created successfully", patient });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ message: "Patient updated successfully", patient });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const searchPatients = async (req, res) => {
  try {
    const { query } = req.query;
    const patients = await Patient.find({
      isActive: true,
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { patientId: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
