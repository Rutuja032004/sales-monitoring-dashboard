require("dotenv").config();
const mongoose = require("mongoose");
const Sale = require("../models/Sale");

console.log("🚀 Seed script started...");

const products = [
  { name: "iPhone 15", category: "Electronics", price: 800 },
  { name: "MacBook Pro", category: "Electronics", price: 2000 },
  { name: "AirPods", category: "Accessories", price: 200 },
  { name: "Nike Shoes", category: "Fashion", price: 150 },
  { name: "T-Shirt", category: "Fashion", price: 40 },
];

const seedSales = async () => {
  try {
    // Connect to MongoDB
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Clear old data
    await Sale.deleteMany({});
    console.log("🧹 Old sales data cleared");

    const sales = [];

    // Generate random sales
    for (let i = 0; i < 150; i++) {
      const product =
        products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 5) + 1;

      sales.push({
        product: product.name,
        category: product.category,
        quantity: quantity,
        price: product.price,
        revenue: product.price * quantity, // ✅ IMPORTANT
        date: new Date(
          Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 90
        ),
      });
    }

    // Insert data
    await Sale.insertMany(sales);
    console.log("🎉 Sales data seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedSales();
