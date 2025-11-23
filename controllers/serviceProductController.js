import ServiceProduct from "../models/ServiceProduct.js";

export const getAllItems = async (req, res) => {
  try {
    const items = await ServiceProduct.find({ isActive: true }).sort({
      createdAt: -1,
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await ServiceProduct.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createItem = async (req, res) => {
  try {
    // Generate unique item ID
    const count = await ServiceProduct.countDocuments();
    const itemId = `${req.body.type === "service" ? "SV" : "PR"}${String(
      count + 1
    ).padStart(5, "0")}`;

    const item = new ServiceProduct({
      ...req.body,
      itemId,
    });

    await item.save();
    res.status(201).json({ message: "Item created successfully", item });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const item = await ServiceProduct.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item updated successfully", item });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await ServiceProduct.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getItemsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const items = await ServiceProduct.find({ type, isActive: true });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
