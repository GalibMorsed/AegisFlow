const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoutes = require("./Routes/authRoutes.js");
const cameraRoutes = require("./Routes/cameraRoutes");
const taskRoutes = require("./Routes/taskRoutes.js");
const eventRoutes = require("./Routes/eventRoutes");
const staffRoutes = require("./Routes/staffRoutes");

require("dotenv").config();
require("./Models/db.js");
const PORT = process.env.PORT || 8000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use("/camera", cameraRoutes);
app.use("/api", taskRoutes);
app.use("/api", eventRoutes);
app.use("/api", staffRoutes);
app.get("/hii", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, (error) => {
  if (error) {
    console.error("Error starting server:", error);
  } else {
    console.log(`Server is running on ${PORT}`);
  }
});
