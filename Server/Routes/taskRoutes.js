const { Router } = require("express");
const taskController = require("../Controllers/taskController");
const { dispCurrUser, requireAuth } = require("../MIddleware/authMiddleware");

const router = Router();

router.post("/tasks", dispCurrUser, taskController.create_post);

router.get("/tasks", dispCurrUser, taskController.read_get);

router.get("/tasks/:id", requireAuth, taskController.read_one_get);

router.post(
  "/tasks/:id",
  requireAuth,
  dispCurrUser,
  taskController.update_post,
);

router.delete(
  "/tasks/:id",
  requireAuth,
  dispCurrUser,
  taskController.delete_get,
);

module.exports = router;
