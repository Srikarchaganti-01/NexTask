const Task = require("../Models/Task");

const handleErrors = (err) => {
  const errors = {
    title: "",
    description: "",
    priority: "",
    category: "",
    access: "",
    deadline: "",
    status: "",
  };

  if (err.message.includes("validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.create_post = async (req, res) => {
  const { title, description, priority, category, access, deadline, status } =
    req.body;
  const user = req.user;
  const userid = user._id;
  try {
    const task = await Task.create({
      title,
      description,
      priority,
      category,
      access,
      deadline,
      status,
      user: userid,
    });
    res
      .status(201)
      .send(`Task with title '${title}' is saved by user with id ${userid}`);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
module.exports.read_get = async (req, res) => {
  const user = req.user;
  const userid = user._id;

  console.log(`request received with user id ${userid}`);

  try {
    const tasks = await Task.find({
      $or: [{ user: userid }, { access: "all" }],
    });

    res.status(200).json({ tasks });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
