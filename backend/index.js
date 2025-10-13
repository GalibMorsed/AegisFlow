const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");  // <- ADD THIS
const usermodel = require("./model/model");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");


mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected ✅"))
.catch((err) => console.log("MongoDB connection error ❌", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/signup", async (req, res) => {
    const { name, age, email, password } = req.body;
    let user = await usermodel.findOne({ email: email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    let users =  await usermodel.create({ name, age, email, password});
    let token = jwt.sign({ id: users._id }, "secretkey");
    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ message: "User created successfully", users });
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let user = await usermodel.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    if (user.password !== password) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    let token = jwt.sign({ id: user._id }, "secretkey");
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful", user });
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
