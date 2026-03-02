const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth.middlewares");

router.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const studentRoutes = require("./students.routes");
router.use("/students", studentRoutes);
const cohortRoutes = require("./cohort.routes");
router.use("/cohorts", cohortRoutes);

const authRoutes = require("./auth.routes");
const User = require("../models/user.model");
router.use("/auth", authRoutes);

router.get("/users/:id", verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    //console.log (user)
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
