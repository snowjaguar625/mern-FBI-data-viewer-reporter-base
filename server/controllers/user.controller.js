const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

const createUser = (req, res) => {
  User.save(req.body);
};

const register = async (req, res) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    console.log("New User", newUser);
    const userToken = jwt.sign(
      {
        _id: newUser._id,
        email: newUser.email,
      },
      SECRET
    );
    res.status(201).json({
      successMessage: "user created",
      user: {
        _id: newUser._id,
        email: newUser.email,
      },
      accessToken: userToken,
    });
  } catch (err) {
    console.log("Error in user creation", err);
    res.status(403).json(err);
  }
};

const login = async (req, res) => {
  const userDoc = await User.findOne({ email: req.body.email });
  if (!userDoc) {
    res.status(400).json({ message: "Invalid login information" });
  } else {
    try {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        userDoc.password
      );
      if (!isPasswordValid) {
        res.status(400).json({ message: "Invalid login information" });
      } else {
        const accessToken = jwt.sign(
          {
            _id: userDoc._id,
            email: userDoc.email
          },
          SECRET
        );
        res.json({ accessToken });
      }
    } catch (err) {
      console.log("Login error", err);
      res.status(400).json({ message: "Invalid login information" });
    }
  }
};

const logout = (req, res) => {
  res.clearToken("userToken");
  res.json({ message: "You are logged out" });
};

const getLoggedInUser = async (req, res) => {
  try {
    const userPayload = jwt.verify(req.token, SECRET);
    const user = await User.findOne({ _id: userPayload._id });
    res.json(user);
  } catch (err) {
    console.log("Error in getting user", err);
    res.status(400).json({ err });
  }
};

module.exports = {
  createUser,
  register,
  login,
  logout,
  getLoggedInUser,
};
