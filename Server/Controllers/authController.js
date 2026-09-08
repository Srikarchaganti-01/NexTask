const User = require("../Models/User");

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
  res.status(200).send("signup Page");
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).send("Account is set up sucessfully ");
  } catch (err) {
    const errors = handleErrors(err);
    res.status(401).json({ errors });
  }
};

module.exports.login_get = (req, res) => {
  res.status(200).send("Login Page");
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    res.status(200).send("Logged in Sucessfully");
  } catch (err) {
    const errors = handleErrors(err);
    res.status(401).json({ errors });
  }
};
