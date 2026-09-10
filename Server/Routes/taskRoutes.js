const { Router } = require("express");
const taskController = require("../Controllers/taskController");
const { dispCurrUser } = require("../MIddleware/authMiddleware");

const router = Router();

router.get("/tasks", dispCurrUser, taskController.read_get);

router.post("/tasks", dispCurrUser, taskController.create_post);

module.exports = router;
