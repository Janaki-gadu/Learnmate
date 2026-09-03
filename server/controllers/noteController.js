const Note = require("../models/Note");

// ➕ Create note
exports.createNote = async (req, res) => {

  try {

    const note = new Note({

      user: req.user.id,

      title: req.body.title,

      content: req.body.content,

      category: req.body.category || "General",

      pinned: req.body.pinned === "true",

      file: req.file ? req.file.path : "",

      fileName: req.file
        ? req.file.originalname
        : "",

    });

    await note.save();

    res.json(note);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to create note",
    });

  }

};

// 📄 Get all notes of user
exports.getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
};

// ✏️ Update note
exports.updateNote = async (req, res) => {
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(note);
};

// ❌ Delete note
exports.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
};