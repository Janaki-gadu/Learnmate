const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  category: {
    type: String,
    default: "General",
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],

}, {
  timestamps: true,
});

module.exports = mongoose.model("Group", groupSchema);