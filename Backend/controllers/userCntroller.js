const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .send({ success: false, message: "User already exists" });
    }

    const saltRound = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(password, saltRound);

    const user = new User({ username, email, password: hasPassword });
    await user.save();

    return res.status(201).send({
      success: true,
      message: "New User is Created!",
      token: await user.generateToken(),
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({
      success: false,
      message: "Server Error",
      err,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        errorMessage: "Please provide email or password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        errorMessage: "Invalid Email!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid username or password!",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Login Successfull!",
      token: await user.generateToken(),
    });
  } catch (err) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Server Error",
      err,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
