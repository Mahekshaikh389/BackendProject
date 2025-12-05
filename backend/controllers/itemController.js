const Item = require("../models/Item");

exports.createItem = async (req, res) => {
  const item = await Item.create({ ...req.body, userId: req.user.id });
  res.json(item);
};

exports.getItems = async (req, res) => {
  const items = await Item.find()
    .populate("userId", "name email role")  
    .sort({ createdAt: -1 });
  res.json(items);
};




exports.updateItem = async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) return res.status(404).json({ message: "Task not found" });

  if (item.userId.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not allowed" });
  }

  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};


exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ message: "Task not found" });

    // Only admin can delete 
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "You are not authorized to delete" });
    }

    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

