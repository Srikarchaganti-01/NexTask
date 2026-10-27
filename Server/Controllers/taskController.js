const Task = require("../Models/Task");
require("../Models/User");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  const errors = {
    title: "",
    description: "",
    priority: "",
    category: "",
    access: "",
    deadline: "",
    status: "",
    auth: "",
    delmsg: "",
  };

  if (err.message.includes("validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  if (err.message.includes("jwt expired")) {
    errors.auth = "The Session is expired Login to continue";
    return errors;
  }

  if (err.message.includes("jwt malformed")) {
    errors.auth = "The User is logged out so get the hell out bitch";
    return errors;
  }

  if (err.message.includes("Cannot read properties of null (reading '_id')")) {
    errors.auth = "Bitch you are logged out ";
    return errors;
  }

  if (err.message.includes("You are not authorised or No such task Exists")) {
    errors.delmsg = "You are not authorised or No such task Exists";
    return errors;
  }
  return errors;
};

module.exports.create_post = async (req, res) => {
  const { title, description, priority, category, access, deadline, status } =
    req.body;

  try {
    const user = req.user;
    const userid = user._id;
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
    res.status(201).json({
      message: `Task with title '${title}' is saved`,
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.read_get = async (req, res) => {
  const user = req.user;
  const userid = user._id;
  const role = user.role;

  const filter = {};

  if (req.query.priority) {
    filter.priority = req.query.priority;
  }
  if (req.query.status) {
    filter.status = req.query.status;
  }
  if (req.query.category) {
    filter.category = req.query.category;
  }

  let sortOption = 1;

  if (req.query.sort === "nto") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = { createdAt: 1 };
  }

  let accessRules = [{ access: "all" }, { access: "self", user: userid }];

  if (role === "user") {
    accessRules.push({ access: "user" });
  }

  if (role === "admin") {
    accessRules.push({ access: "admin" });
  }
  console.log(`Request received user id ${userid}`);

  try {
    const tasks = await Task.find({
      ...filter,
      $or: accessRules,
    }).sort(sortOption);

    res.status(200).json({ tasks });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

// module.exports.read_one_get = async (req, res) => {
//   const task_id = req.params.id;

//   console.log(`Task id : ${task_id}`);

//   try {
//     const task = await Task.findOne({ _id: task_id });
//     if (!task) res.status(404).send("No such task Exists in Db");
//     else res.status(200).json({ task });
//   } catch (err) {
//     const errors = handleErrors(err);
//     res.status(400).json({ errors });
//   }
// };

module.exports.read_one_get = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "user",
      "username",
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.update_post = async (req, res) => {
  const task_id = req.params.id;
  const userid = req.user._id;
  const { title, description, priority, category, deadline, status } = req.body;

  console.log(`Task id : ${task_id}`);

  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: task_id,
        user: userid,
      },
      {
        title,
        description,
        priority,
        category,
        deadline,
        status,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    if (!task) {
      return res.status(404).json({
        message: "Task not found or you cannot edit this task",
      });
    }
    res.status(200).json({ task });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.delete_get = async (req, res) => {
  const task_id = req.params.id;
  const userid = req.user._id;

  console.log(`Task id : ${task_id}`);

  try {
    const task = await Task.findOneAndDelete({ user: userid, _id: task_id });
    if (!task) {
      res
        .status(404)
        .json({ msg: "You are not authorised or No such task Exists " });
    } else
      res
        .status(200)
        .send(
          `The task with id : ${task._id} with title: ${task.title} is deleted`,
        );
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
