const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");

// ===============================
// GET TOTAL REVENUE
// ===============================
router.get("/total-revenue", async (req, res) => {
  try {
    const result = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$revenue" },
        },
      },
    ]);

    res.json({
      totalRevenue: result.length > 0 ? result[0].totalRevenue : 0,
    });
  } catch (error) {
    console.error("❌ Total revenue error:", error.message);
    res.status(500).json({ error: "Failed to fetch total revenue" });
  }
});

// ===============================
// GET MONTHLY REVENUE
// ===============================
router.get("/monthly-revenue", async (req, res) => {
  try {
    const data = await Sale.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          revenue: { $sum: "$revenue" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec",
    ];

    const formattedData = data.map(item => ({
      month: months[item._id - 1],
      revenue: item.revenue,
    }));

    res.json(formattedData);
  } catch (error) {
    console.error("❌ Monthly revenue error:", error.message);
    res.status(500).json({ error: "Failed to fetch monthly revenue" });
  }
});

// ===============================
// GET CATEGORY WISE REVENUE
// ===============================
router.get("/category-revenue", async (req, res) => {
  try {
    const result = await Sale.aggregate([
      {
        $group: {
          _id: "$category",
          revenue: { $sum: "$revenue" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          revenue: 1,
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    console.error("❌ Category revenue error:", error.message);
    res.status(500).json({ error: "Failed to fetch category revenue" });
  }
});

module.exports = router;
