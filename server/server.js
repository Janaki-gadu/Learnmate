const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");

const app = express();


// =======================
// Middleware
// =======================
const cors = require("cors");

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Explicitly handle OPTIONS preflight requests
app.options("*", cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/api/notifications", require("./routes/notificationRoutes"));


// =======================
// Routes
// =======================

const authRoutes = require("./routes/auth");
const groupRoutes = require("./routes/groupRoutes");
const noteRoutes = require("./routes/notes");


// Auth
app.use("/api", authRoutes);


// Groups
app.use("/api/groups", groupRoutes);


// Notes
app.use("/api/notes", noteRoutes);



// =======================
// Test Route
// =======================

app.get("/", (req,res)=>{
    res.send("LearnMate API running 🚀");
});




// =======================
// Profile Route
// =======================

// =======================
// Profile Routes
// =======================

const authMiddleware = require("./middleware/authMiddleware");

// GET Profile
app.get("/api/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -__v");
    res.json({
      message: "User profile",
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT Update Profile (ADD THIS BLOCK)
app.put("/api/profile", authMiddleware, async (req, res) => {
  try {
    const { name, bio, learningGoal } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio, learningGoal },
      { new: true, runValidators: true }
    ).select("-password -__v");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("PUT Profile Error:", err);
    res.status(500).json({ error: err.message });
  }
});




// =======================
// MongoDB
// =======================

console.log("Mongo:",
process.env.MONGO_URI);


mongoose.connect(process.env.MONGO_URI,{
    serverSelectionTimeoutMS:5000
})
.then(()=>{
    console.log("DB Connected ✅");
})
.catch(err=>{
    console.log("Mongo error:",err.message);
});




// =======================
// Server
// =======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});