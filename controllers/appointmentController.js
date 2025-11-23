import Appointment from "../models/Appointment.js";

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "firstName lastName patientId phone")
      .populate("doctor", "fullName email")
      .sort({ appointmentDate: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patient")
      .populate("doctor", "-password")
      .populate("prescription");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createAppointment = async (req, res) => {
  try {
    // Generate unique appointment ID
    const count = await Appointment.countDocuments();
    const appointmentId = `A${String(count + 1).padStart(5, "0")}`;

    const appointment = new Appointment({
      ...req.body,
      appointmentId,
    });

    await appointment.save();

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate("patient", "firstName lastName patientId phone")
      .populate("doctor", "fullName email");

    res
      .status(201)
      .json({
        message: "Appointment created successfully",
        appointment: populatedAppointment,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate("patient", "firstName lastName patientId phone")
      .populate("doctor", "fullName email");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment updated successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAppointmentsByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const appointments = await Appointment.find({
      appointmentDate: { $gte: startDate, $lt: endDate },
    })
      .populate("patient", "firstName lastName patientId phone")
      .populate("doctor", "fullName email");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
