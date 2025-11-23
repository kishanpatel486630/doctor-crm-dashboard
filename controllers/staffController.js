import Staff from "../models/Staff.js";

export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find({ isActive: true })
      .populate("user", "username email role")
      .sort({ createdAt: -1 });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id).populate(
      "user",
      "-password"
    );
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createStaff = async (req, res) => {
  try {
    // Generate unique staff ID
    const count = await Staff.countDocuments();
    const staffId = `S${String(count + 1).padStart(5, "0")}`;

    const staff = new Staff({
      ...req.body,
      staffId,
    });

    await staff.save();
    const populatedStaff = await Staff.findById(staff._id).populate(
      "user",
      "username email role"
    );
    res
      .status(201)
      .json({ message: "Staff created successfully", staff: populatedStaff });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("user", "username email role");

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.json({ message: "Staff updated successfully", staff });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
