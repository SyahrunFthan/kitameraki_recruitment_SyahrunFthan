const Task = require("../models/Task");

// Create Task
const createTask = async (req, res) => {
  const { title, description, dueDate, priority, status, tags } = req.body;
  // Validasi Inputan
  if (title == "")
    return res
      .status(400)
      .json({ message: "Title must be filled!", error: "title" });
  if (description == "")
    return res
      .status(400)
      .json({ message: "Desctiption must be filled!", error: "description" });
  if (dueDate == "")
    return res
      .status(400)
      .json({ message: "Due date must be filled!", error: "dueDate" });
  if (priority == "")
    return res
      .status(400)
      .json({ message: "Select priority!", error: "priority" });
  if (status == "")
    return res.status(400).json({ message: "Select status!", error: "status" });
  if (tags == "")
    return res
      .status(400)
      .json({ message: "Tags must be filled!", error: "tags" });

  try {
    // Check Title Tugas
    const checkTask = await Task.findOne({ title: title });
    if (checkTask)
      return res
        .status(409)
        .json({ message: `Tugas ${checkTask.title} sudah ada!` });

    // Save to database
    await Task(req.body).save();

    return res.status(201).json({ message: "Data berhasil di simpan!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get data with pagination
const getDataTask = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  try {
    const skip = (page - 1) * limit;
    // Mengambil Data berdasarkan pencarian dan limit
    const response = await Task.find({
      title: { $regex: search, $options: "i" },
    })
      .limit(limit)
      .skip(skip)
      .exec();

    // Hitung data berdasarkan pencarian
    const countData = await Task.countDocuments({
      title: { $regex: search, $options: "i" },
    });

    // Menghitung Total Page
    const totalPages = Math.ceil(countData / limit);
    const currentPage = page;

    return res.status(200).json({ response, totalPages, currentPage });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Mengambil Data Tugas Berdasarkan ID
const getDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Task.findById(id);

    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update Task
const updateTask = async (req, res) => {
  const { title, description, dueDate, priority, status, tags } = req.body;
  const { id } = req.params;
  // Validasi Inputan
  if (title == "")
    return res
      .status(400)
      .json({ message: "Title must be filled!", error: "title" });
  if (description == "")
    return res
      .status(400)
      .json({ message: "Desctiption must be filled!", error: "description" });
  if (dueDate == "")
    return res
      .status(400)
      .json({ message: "Due date must be filled!", error: "dueDate" });
  if (priority == "")
    return res
      .status(400)
      .json({ message: "Select priority!", error: "priority" });
  if (status == "")
    return res.status(400).json({ message: "Select status!", error: "status" });
  if (tags == "")
    return res
      .status(400)
      .json({ message: "Tags must be filled!", error: "tags" });

  try {
    // Save change
    await Task.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json({ message: "Data berhasil di ubah!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    // Get data id task
    const task = await Task.findById(id);
    if (!task)
      return res.status(404).json({ message: "Data tidak di temukan!" });

    // Delete data berdasarkan id
    await Task.findByIdAndDelete(id);

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getDataTask,
  updateTask,
  deleteTask,
  getDataById,
};
