import Lead from "../models/Lead.js";

export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find()
      .populate("assignedTo", "fullName email")
      .populate("convertedToPatient", "firstName lastName patientId")
      .sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate("assignedTo", "fullName email")
      .populate("convertedToPatient");

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createLead = async (req, res) => {
  try {
    // Generate unique lead ID
    const count = await Lead.countDocuments();
    const leadId = `L${String(count + 1).padStart(5, "0")}`;

    const lead = new Lead({
      ...req.body,
      leadId,
    });

    await lead.save();
    const populatedLead = await Lead.findById(lead._id).populate(
      "assignedTo",
      "fullName email"
    );

    res
      .status(201)
      .json({ message: "Lead created successfully", lead: populatedLead });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("assignedTo", "fullName email")
      .populate("convertedToPatient", "firstName lastName patientId");

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({ message: "Lead updated successfully", lead });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getLeadsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const leads = await Lead.find({ status })
      .populate("assignedTo", "fullName email")
      .sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
