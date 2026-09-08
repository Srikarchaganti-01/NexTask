const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

// Signup & validation
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [20, "Username cannot exceed 20 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [isEmail, "Please enter a valid email"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password must not be empty"],
      minlength: [6, "Password must be atleast 6 characters long"],
    },
    role: {
      required: [true, "Role is required"],
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  console.log("Pre  : Hashing Pass Before Saving in DB");
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.post("save", async function (doc) {
  console.log(
    `Post : User with username ${doc.username} & id ${doc._id} created`,
  );
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
