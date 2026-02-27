const router = require("express").Router();

const User = require("../models/user.model");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const verifyToken = require("../middlewares/auth.middlewares");

router.post("/signup", async (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({ errorMessage: "All fields are required" });
    return;
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (!passwordRegex.test(password)) {
    res
      .status(400)
      .son({ errorMessage: "Password doesn't meet the minimun requierements" });
    return;
  }

  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      res
        .status(400)
        .json({
          errorMessage: "Email already exist. Please choose another email",
        });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const response = await User.create({
      email: email,
      password: hashPassword,
      name: name,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ errorMessage: "Both fields (email and password) are required" });
    return;
  }
  try {
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      res
        .status(400)
        .json({ errorMessage: "There is not user associated with this email" });
      return;
    }
    console.log("found user");

    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password,
    );

    if (!isPasswordCorrect) {
      res.status(400).json({ errorMessage: "Incorrect password" });
      return;
    }

    const payload = { _id: foundUser._id, email: foundUser.email };
    console.log(payload);
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d",
    });

    res.status(200).json({ authToken: authToken, payload: payload });
  } catch (error) {
    next(error);
  }
});

router.get("/verify", verifyToken, (req,res) => {

    res.status(200).json ({ payload:req.payload})
});

module.exports = router;
