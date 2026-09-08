const User = require("../Models/User");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };
  if (err.message === "Incorrect Email") {
    errors.email = "This Email is not Resgestered try Signing Up ";
  } else if (err.message === "Incorrect Password") {
    errors.password = "Incorrect Password Try Again";
  } else if (err.code === 11000) {
    errors.email = "An user already Exists with the Email Try Logging in";
    return errors;
  } else if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.signup_get = (req, res) => {
  res.status(200).send("signup Page");
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(401).json({ errors });
  }
};

module.exports.login_get = (req, res) => {};

module.exports.login_post = (req, res) => {};
