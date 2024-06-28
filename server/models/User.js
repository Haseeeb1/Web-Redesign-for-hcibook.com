const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  completedChapters: {
    type: [String], // An array of strings
    default: [], // Default value is an empty array
  },
  completedExercises: {
    type: [String], // An array of strings
    default: [], // Default value is an empty array
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
