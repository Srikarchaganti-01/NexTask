const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

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
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.post("save", async function (doc) {
  console.log("post Saving to DB");
});

// login
UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    console.log(user);
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Email");
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
