const express = require("express");
const { signup, login } = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Example of a protected route
router.get("/me", auth, (req, res) => {
  res.send("User info");
});

module.exports = router;
