const { Router } = require("express");
const { requireAuth, checkCurrUser } = require("../MIddleware/authMiddleware");
const { dispCurrUser } = require("../MIddleware/authMiddleware");
const dashController = require("../Controllers/dashController");

const router = Router();

router.use(checkCurrUser);

router.get("/", (req, res) => {
  res.send("NexTask is Up and Running");
});

router.get("/home", requireAuth, dispCurrUser, dashController.dashboard_get);

router.get("/me", requireAuth, dispCurrUser, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
