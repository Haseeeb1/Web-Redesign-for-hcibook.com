const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get completed chapters and exercises for a user
router.get("/:id/completed", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({
      completedExercises: user.completedExercises,
      completedChapters: user.completedChapters,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Toggle exercise in completedExercises
router.post("/:id/completedExercises", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const exerciseIndex = user.completedExercises.indexOf(
      req.body.exerciseName
    );
    if (exerciseIndex > -1) {
      user.completedExercises.splice(exerciseIndex, 1); // Remove the exercise if it exists
    } else {
      user.completedExercises.push(req.body.exerciseName); // Add the exercise if it doesn't exist
    }

    await user.save();
    res.json(user.completedExercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Toggle chapter in completedChapters
router.post("/:id/completedChapters", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const chapterIndex = user.completedChapters.indexOf(req.body.chapterName);
    if (chapterIndex > -1) {
      user.completedChapters.splice(chapterIndex, 1); // Remove the chapter if it exists
    } else {
      user.completedChapters.push(req.body.chapterName); // Add the chapter if it doesn't exist
    }

    await user.save();
    res.json(user.completedChapters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
