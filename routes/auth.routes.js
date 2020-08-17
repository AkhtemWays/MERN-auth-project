const { Router } = require("express");
const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");

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
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Неверно введены данные",
        errors: "Неверный пароль",
      });
    }
    const token = await jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
      expiresIn: "1h",
    });
    return res.status(201).json({
      message: "Вы успешно авторизованы",
      errors: null,
      token: token,
      userId: user.id,
    });
  } catch (e) {
    return res.status(500).json({
      message: `Что то пошло не так, ${e}`,
    });
  }
});

router.post(
  "/register",
  [
    check("email", "Неверно указана почта").isEmail(),
    check("password", "Пароль не должен быть менее 6 символов").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({
        message: "Укажите верные реквизиты",
        errors: errors.array(),
      });
    }
    try {
      const { email, password } = req.body;
      const candidate = await User.findOne({ email: email });
      if (candidate) {
        return res.status(400).json({
          message: "Такой пользователь уже существует",
          errors: "Такой пользователь уже существует",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await new User({
        email: email,
        password: hashedPassword,
      });
      await newUser.save();
      return res.status(201).json({
        message: "Пользователь создан",
      });
    } catch (e) {
      return res.status(500).json({
        message: "Server error",
      });
    }
  }
);

module.exports = router;
