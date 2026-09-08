const { Router } = require("express");
const { requireAuth, checkCurrUser } = require("../MIddleware/authMiddleware");
const { dispCurrUser } = require("../MIddleware/authMiddleware");

const router = Router();

router.use(checkCurrUser);

router.get("/", (req, res) => {
  res.send("NexTask is Up and Running");
});

router.get("/home", requireAuth, (req, res) => {
  res.status(200).send("You are authenticated");
});

router.get("/me", requireAuth, dispCurrUser, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
