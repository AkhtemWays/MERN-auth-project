const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Неверно введены данные",
        errors: "Поля не должны быть пустыми",
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "Неверно введены данные",
        errors: "Такого пользователя не существует",
      });
    }
    if (!password === user.password) {
      return (
        res,
        status(400).json({
          message: "Неверно введены данные",
          errors: "Неверный пароль",
        })
      );
    }
    return res.status(200).json({
      message: "Вход в систему авторизован",
      errors: [],
    });
  } catch (e) {
    throw new Error("Server error ", e.message);
  }
});

module.exports = router;
