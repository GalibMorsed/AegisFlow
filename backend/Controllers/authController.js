const usermodel = require("../Models/Users");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, age, email, password } = req.body;
    let user = await usermodel.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    let users = await usermodel.create({ name, age, email, password });
    let token = jwt.sign({ id: users._id }, "secretkey");
    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ message: "User created successfully", users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error during signup", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await usermodel.findOne({ email: email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    let token = jwt.sign({ id: user._id }, "secretkey");
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error during login", error: error.message });
  }
};

module.exports = { signup, login };
