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
const allowedOrigins = [
  "http://localhost:5173",
  "https://aegis-flow-dier-l63y0rtxz-morsedgalib982-gmailcoms-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow mobile apps & curl
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
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
