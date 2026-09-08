const express = require("express");
const mongoose = require("mongoose");

// express middleware
const app = express();
app.use(express.json());

// view enjine
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

app.get("/", (req, res) => {
  res.send("NexTask is Up and Running");
});
