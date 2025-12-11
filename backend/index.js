// index.js
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

// Middleware: register BEFORE routes
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin:
      "https://aegis-flow-91vl1ckqg-morsedgalib982-gmailcoms-projects.vercel.app",
    credentials: true,
  })
);

// Health and root routes
app.get("/health", (req, res) => res.sendStatus(200));
app.get("/", (req, res) => res.send("API is running"));

// Your routers
app.use("/auth", authRoutes);
app.use("/camera", cameraRoutes);
app.use("/profile", profileRoutes);

// Single listen at end; bind to PORT and 0.0.0.0
const PORT = process.env.PORT || 8000;
app.listen(PORT, "0.0.0.0", (error) => {
  if (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
  console.log(`Server is running on ${PORT}`);
});
