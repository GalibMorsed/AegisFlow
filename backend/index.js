const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoutes = require("./Routes/authRoutes.js");
const cameraRoutes = require("./Routes/cameraRoutes");
const profileRoutes = require("./Routes/profileRoutes");

require("dotenv").config();
require("./Models/db.js");
const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on ${PORT}`);
});


app.get("/hii", (req, res) => {
  res.send("Hello World");
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
    credentials: true, // Allow cookies to be sent
  })
);
app.get("/health", (req, res) => res.sendStatus(200));
app.use("/auth", authRoutes);
app.use("/camera", cameraRoutes);
app.use("/profile", profileRoutes);

app.listen(PORT, (error) => {
  if (error) {
    console.error("Error starting server:", error);
  } else {
    console.log(`Server is running on ${PORT}`);
  }
});
