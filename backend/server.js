const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-z6sf.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


app.options("*", cors());

app.use(express.json());

connectDB();

// API versioning
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/items", require("./routes/itemRoutes"));

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
