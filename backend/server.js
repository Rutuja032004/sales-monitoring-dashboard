require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const salesRoutes = require("./routes/salesRoutes");
const Sale = require("./models/Sale");

const app = express();

// ===============================
// CONNECT DATABASE
// ===============================
connectDB();

// ===============================
// MIDDLEWARE
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// ROUTES
// ===============================
app.use("/api/sales", salesRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Sales Dashboard API is running");
});

// ===============================
// DEBUG (VERY IMPORTANT)
// ===============================
mongoose.connection.once("open", async () => {
  console.log("✅ Connected DB name:", mongoose.connection.name);

  const count = await Sale.countDocuments();
  console.log("📊 Sales documents count:", count);

  if (count === 0) {
    console.log("❌ WARNING: No sales data found in this database");
  }
});

// ===============================
// START SERVER
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
