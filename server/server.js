const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const userRoutes = require("./routes/user");
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
