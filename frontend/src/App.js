import { useEffect, useState } from "react";
import {
  getTotalRevenue,
  getMonthlyRevenue,
  getCategoryRevenue,
} from "./api";

import MonthlyRevenueChart from "./components/MonthlyRevenueChart";
import CategoryRevenueChart from "./components/CategoryRevenueChart";

function App() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [categoryRevenue, setCategoryRevenue] = useState([]);

  useEffect(() => {
    getTotalRevenue()
      .then((res) => setTotalRevenue(res.data.totalRevenue))
      .catch((err) => console.error(err));

    getMonthlyRevenue()
      .then((res) => setMonthlyRevenue(res.data))
      .catch((err) => console.error(err));

    getCategoryRevenue()
      .then((res) => setCategoryRevenue(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Sales Dashboard</h1>

      <h2>Total Revenue: ₹{totalRevenue}</h2>

      <h3>📈 Monthly Revenue</h3>
      <MonthlyRevenueChart data={monthlyRevenue} />

      <h3>🥧 Category-wise Revenue</h3>
      <CategoryRevenueChart data={categoryRevenue} />
    </div>
  );
}

export default App;
