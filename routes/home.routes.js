const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/", async (req, res) => {
  const user = await User.find();
  console.log(user);
  return res.status(201).json({
    message: "Всё хорошо",
    user: user,
  });
});

module.exports = router;
