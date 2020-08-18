const { Router } = require("express");
const User = require("../models/user");
const authMiddleware = require("../middleware/auth.middleware");

const router = Router();

router.get("/all", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    return res.json({
      users: users,
    });
  } catch (e) {
    res.status(500).json({
      message: `Server error`,
    });
    console.log(`Server error on /api/users/get, ${e.message}`);
  }
});

module.exports = router;
