require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/userRoutes");
const taskRoutes = require("./Routes/taskRoutes");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

const dbURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://nex-task-sigma.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("MongoDB Atlas connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

app.use(authRoutes);
app.use(userRoutes);
app.use(taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
