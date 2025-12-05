const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

const allowedOrigins = [
  "https://frontend-z6sf.onrender.com",
  "http://localhost:5173"
];

// JSON parser MUST be before routes
app.use(express.json());

// FINAL CORS HANDLER
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  next();
});

connectDB();

// Routes AFTER CORS
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/items", require("./routes/itemRoutes"));

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
