const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkCurrUser } = require("./MIddleware/authMiddleware");

// express middleware
const app = express();
app.use(express.json());
app.use(cookieParser());

//view engine
app.set("view engine", "ejs");

// DB connection
const dbURI = "mongodb://127.0.0.1:27017/NexTask";

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("MongoDB Compass (local) is connected Sucessfully");
    app.listen(3000, () => {
      console.log("Server Up and Running live on Port 3000");
    });
  })
  .catch((err) => {
    console.log("Connection Error with Mongo :", err);
  });

// Routes

app.use(checkCurrUser);
app.get("/", (req, res) => {
  res.send("NexTask is Up and Running");
});
app.use(authRoutes);
app.get("/home", requireAuth, (req, res) => {
  res.status(200).send("You are authenticated");
});
