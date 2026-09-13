const Task = require("../Models/Task");

module.exports.dashboard_get = async (req, res) => {
  const userid = req.user._id;
  const username = req.user.username;
  const role = req.user.role;
  const accessRules = [{ access: "all" }, { access: "self", user: userid }];
  if (role === "user") {
    accessRules.push({ access: "user" });
  }
  if (role === "admin") {
    accessRules.push({ access: "admin" });
  }

  try {
    const tasks = await Task.find({
      $or: accessRules,
    });

    const total = tasks.length;
    const complete = tasks.filter((task) => task.status === "completed").length;
    const working = tasks.filter((task) => task.status === "working").length;
    const overdue = tasks.filter((task) => task.status === "overdue").length;
    const alloted = tasks.filter((task) => task.status === "alloted").length;
    const priority = {
      imp: tasks.filter((task) => task.priority === "imp").length,
      top: tasks.filter((task) => task.priority === "top").length,
      med: tasks.filter((task) => task.priority === "med").length,
      low: tasks.filter((task) => task.priority === "low").length,
      nil: tasks.filter((task) => task.priority === "nil").length,
    };

    res.status(200).json({
      userid,
      username,
      role,
      total,
      complete,
      working,
      overdue,
      alloted,
      priority,
    });
  } catch (err) {
    res.status(400).json({
      error: "Failed to load dashboard",
    });
  }
};
