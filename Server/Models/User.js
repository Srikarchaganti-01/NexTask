const mongoose = require("mongoose");
const { isEmail } = require("validator");

// Signup & validation
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: [isEmail, "Please enter a valid email"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password must not be empty"],
    minlength: [6, "Password must be atleast 6 characters long"],
  },
});

UserSchema.pre("save", async function (next) {
  console.log("Pre Saving in DB");
});

UserSchema.post("save", async function (doc) {
  console.log("post Saving to DB");
});

// login

const User = mongoose.model("user", UserSchema);

module.exports = User;
