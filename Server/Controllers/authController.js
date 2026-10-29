const User = require("../Models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require("crypto");
const sendEmail = require("../Utils/SendEmail");
const verificationEmail = require("../Utils/verificationEmail");
const JWT_secret_code = process.env.JWT_SECRET;
const Credentials = require("../Models/Credentials");
const maxTime = 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, JWT_secret_code, {
    expiresIn: maxTime,
  });
};
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };
  if (err.message.includes === "Incorrect Email") {
    errors.email = "This Email is not Resgestered try Signing Up ";
  } else if (err.message.includes === "Incorrect Password") {
    errors.password = "Incorrect Password Try Again";
  } else if (err.code === 11000) {
    errors.email = "An user already Exists with the Email Try Logging in";
    return errors;
  } else if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  } else {
    errors.email = "Something went wrong check email, password and try again";
  }

  return errors;
};

module.exports.signup_get = (req, res) => {
  res.status(200).send("signup");
};

module.exports.signup_post = async (req, res) => {
  const { username, email, password, employeeId, organisationId } = req.body;

  let credential = null;
  let userCreated = false;

  try {
    const normalizedEmail = email?.trim().toLowerCase();

    // Validate required fields
    if (
      !username?.trim() ||
      !password ||
      !employeeId?.trim() ||
      !organisationId?.trim() ||
      !normalizedEmail
    ) {
      return res.status(400).json({
        errors: { general: "Please fill in all required fields." },
      });
    }

    // Claim an authorised credential atomically
    credential = await Credentials.findOneAndUpdate(
      {
        employeeId: employeeId.trim(),
        organisationId: organisationId.trim(),
        email: normalizedEmail,
        isUsed: false,
      },
      { $set: { isUsed: true } },
      { new: true },
    );

    if (!credential) {
      return res.status(403).json({
        errors: {
          general:
            "Your employee credentials are invalid or have already been used.",
        },
      });
    }

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const verificationTokenHash = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    const verificationTokenExpiry = Date.now() + 15 * 60 * 1000;

    const user = await User.create({
      username: username.trim(),
      email: normalizedEmail,
      password,
      role: credential.role,
      isVerified: false,
      verificationTokenHash,
      verificationTokenExpiry,
    });

    userCreated = true;

    await Credentials.updateOne(
      { _id: credential._id },
      { $set: { userId: user._id } },
    );

    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

    await sendEmail(
      normalizedEmail,
      "Verify your NexTask account",
      verificationEmail(verificationLink),
    );

    return res.status(201).json({
      msg: "Account created. Please check your email to verify your account.",
    });
  } catch (err) {
    console.error("Signup error:", err);

    // Release the credential only if user creation failed
    if (credential && !userCreated) {
      await Credentials.updateOne(
        { _id: credential._id },
        { $set: { isUsed: false } },
      ).catch(console.error);
    }

    if (err.code === 11000) {
      return res.status(400).json({
        errors: { general: "An account with these details already exists." },
      });
    }

    if (userCreated) {
      return res.status(500).json({
        errors: {
          general:
            "Your account was created, but verification email delivery failed. Please contact support.",
        },
      });
    }

    const errors = handleErrors(err);
    return res.status(400).json({ errors });
  }
};

module.exports.login_get = (req, res) => {
  res.status(200).send("login Page");
};

// module.exports.login_post = async (req, res) => {
//   const { email, password } = req.body;
//   try {

//     const user = await User.login(email, password);
//     const token = createToken(user._id);
//     res.cookie("jwt", token, { httpOnly: true, maxAge: maxTime * 1000 });
//     res.status(200).json({ msg: "Logged in Sucessfully" });
//   } catch (err) {
//     const errors = handleErrors(err);
//     res.status(401).json({ errors });
//   }
// };

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    if (!user.isVerified) {
      return res.status(401).json({
        errors: {
          email: "Please verify your email before logging in.",
        },
      });
    }
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxTime * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.status(200).json({ msg: "Logged in Successfully" });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(401).json({ errors });
  }
};

module.exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ msg: "Verification token missing" });
    }

    const verificationTokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      verificationTokenHash,
      verificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        msg: "Invalid or expired verification link",
      });
    }

    user.isVerified = true;
    user.verificationTokenHash = undefined;
    user.verificationTokenExpiry = undefined;

    await user.save();

    res
      .status(200)
      .json({ msg: "Email verified successfully. You can now log in." });
  } catch (err) {
    console.error("Email verification error:", err);

    res.status(500).json({
      msg: "Email verification failed",
      error: err.message,
    });
  }
};

module.exports.logout_get = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: 0,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  console.log("User Logging out");
  res.status(205).send();
};
