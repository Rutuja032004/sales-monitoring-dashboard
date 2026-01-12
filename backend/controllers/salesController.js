const Sale = require("../models/Sale");

// 1️⃣ Total Revenue
exports.getTotalRevenue = async (req, res) => {
  try {
    const result = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$revenue" },
        },
      },
    ]);

    res.json({ totalRevenue: result[0]?.totalRevenue || 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2️⃣ Monthly Sales
exports.getMonthlySales = async (req, res) => {
  try {
    const result = await Sale.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          totalRevenue: { $sum: "$revenue" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3️⃣ Top Products
exports.getTopProducts = async (req, res) => {
  try {
    const result = await Sale.aggregate([
      {
        $group: {
          _id: "$product",
          totalRevenue: { $sum: "$revenue" },
          totalQuantity: { $sum: "$quantity" },
        },
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 5 },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4️⃣ Category-wise Revenue
exports.getCategoryRevenue = async (req, res) => {
  try {
    const result = await Sale.aggregate([
      {
        $group: {
          _id: "$category",
          totalRevenue: { $sum: "$revenue" },
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
