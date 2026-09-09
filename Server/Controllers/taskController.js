const Task = require("../Models/Task");

const handleErrors = (err) => {
  console.log("currently Errrs are handled");
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
    res.status(401).json({ errors });
  }
};
