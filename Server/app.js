require("dotenv").config();

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
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("MongoDB Compass (local) is connected Sucessfully");
    app.listen(process.env.PORT, () => {
      console.log("Server Up and Running live on Port 3000");
    });
  })
  .catch((err) => {
    console.log("Connection Error with Mongo :", err);
  });

app.use(authRoutes);
app.use(userRoutes);
app.use(taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
