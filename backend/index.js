const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
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
