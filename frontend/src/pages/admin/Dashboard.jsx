// src/pages/admin/Dashboard.jsx
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import StatCard from "../../components/admin/StatCard";
import { Package, CheckCircle, XCircle, Users, Home } from "lucide-react";
import { useAdmin } from "../../context/AdminContext.jsx";

const Dashboard = () => {
  const { products, showrooms, customers } = useAdmin();

  // ---------------- Stats ----------------
  const stats = {
    totalProducts: products.length,
    inStock: products.filter((p) => p.stockStatus === "In Stock").length,
    outOfStock: products.filter((p) => p.stockStatus === "Out of Stock").length,
    totalShowrooms: showrooms.length,
    totalCustomers: customers.length,
  };

  // ---------------- Charts ----------------
  const stockData = [
    { name: "In Stock", value: stats.inStock },
    { name: "Out of Stock", value: stats.outOfStock },
  ];

  const productsByCategory = products.reduce((acc, p) => {
    const found = acc.find((c) => c.category === p.category);
    if (found) found.count += 1;
    else acc.push({ category: p.category, count: 1 });
    return acc;
  }, []);

  // Vibrant colors
  const PIE_COLORS = ["#4F46E5", "#6366F1"];
  const BAR_COLOR = "#4F46E5";

  return (
    <div className=" min-h-screen bg-[#FFF8E8] space-y-6">
      <h1 className="text-3xl md:text-4xl font-black mb-6 text-[#08221B]">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          label="Total Products"
          value={stats.totalProducts}
          icon={Package}
          color="text-indigo-600"
          bg="bg-indigo-50"
        />
        <StatCard
          label="In Stock"
          value={stats.inStock}
          icon={CheckCircle}
          color="text-green-600"
          bg="bg-green-50"
        />
        <StatCard
          label="Out of Stock"
          value={stats.outOfStock}
          icon={XCircle}
          color="text-red-600"
          bg="bg-red-50"
        />
        <StatCard
          label="Showrooms"
          value={stats.totalShowrooms}
          icon={Home}
          color="text-purple-600"
          bg="bg-purple-50"
        />
        <StatCard
          label="Customers"
          value={stats.totalCustomers}
          icon={Users}
          color="text-yellow-600"
          bg="bg-yellow-50"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Stock Pie Chart */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Product Stock Status
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stockData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {stockData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Products by Category Bar Chart */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Products by Category
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productsByCategory}>
              <XAxis dataKey="category" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill={BAR_COLOR} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="space-y-6">
        {/* Products Table */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Products</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm md:text-base border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">SKU</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Stock</th>
                  <th className="px-4 py-2 text-left">Rating</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">{p.sku}</td>
                    <td className="px-4 py-2">{p.category}</td>
                    <td className="px-4 py-2">{p.price}</td>
                    <td className="px-4 py-2">{p.stockStatus}</td>
                    <td className="px-4 py-2">{p.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Showrooms Table */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Showrooms
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm md:text-base border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">City</th>
                  <th className="px-4 py-2 text-left">State</th>
                  <th className="px-4 py-2 text-left">Timings</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                </tr>
              </thead>
              <tbody>
                {showrooms.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2">{s.name}</td>
                    <td className="px-4 py-2">{s.city}</td>
                    <td className="px-4 py-2">{s.state}</td>
                    <td className="px-4 py-2">{s.timings}</td>
                    <td className="px-4 py-2">{s.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Customers
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm md:text-base border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Contact</th>
                  <th className="px-4 py-2 text-left">Gender</th>
                  <th className="px-4 py-2 text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2">{c.name}</td>
                    <td className="px-4 py-2">{c.email}</td>
                    <td className="px-4 py-2">{c.contact}</td>
                    <td className="px-4 py-2">{c.gender}</td>
                    <td className="px-4 py-2">{c.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
