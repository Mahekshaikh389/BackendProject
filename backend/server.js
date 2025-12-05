const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(cors({origin: "http://localhost:5173",}));
app.use(express.json());

connectDB();

// API versioning
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/items", require("./routes/itemRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
