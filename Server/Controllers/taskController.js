const Task = require("../Models/Task");

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
  const role = user.role;

  console.log(`Request received with user id ${userid}`);

  try {
    const accessRules = [{ access: "all" }, { access: "self", user: userid }];

    if (role === "user") {
      accessRules.push({ access: "user" });
    }

    if (role === "admin") {
      accessRules.push({ access: "admin" });
    }

    const tasks = await Task.find({
      $or: accessRules,
    });

    res.status(200).json({ tasks });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.read_one_get = async (req, res) => {
  const task_id = req.params.id;

  console.log(`Task id : ${task_id}`);

  try {
    const task = await Task.findOne({ _id: task_id });
    if (!task) res.status(404).send("No such task Exists in Db");
    else res.status(200).json({ task });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
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
      res.status(404).send("You are not authorised or No such task Exists ");
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
