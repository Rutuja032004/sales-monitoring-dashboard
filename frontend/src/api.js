import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/sales",
});

export const getTotalRevenue = () => API.get("/total-revenue");
export const getMonthlyRevenue = () => API.get("/monthly-revenue");
export const getCategoryRevenue = () => API.get("/category-revenue");

export default API;
