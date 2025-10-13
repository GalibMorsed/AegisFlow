const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");  // <- ADD THIS
const usermodel = require("./model/model");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();
require("./Models/db.js");
const PORT = process.env.PORT || 8000;

app.get("/hii", (req, res) => {
  res.send("Hello World");
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use("/auth", authRoutes);

app.listen(PORT, (error) => {
  if (error) {
    console.error("Error starting server:", error);
  } else {
    console.log(`Server is running on ${PORT}`);
  }
});
