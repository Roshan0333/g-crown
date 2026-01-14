// src/pages/admin/Orders.jsx
import React, { useState, useMemo } from "react";
import { Check, XCircle, Clock, Package, Search, Edit } from "lucide-react";
import StatCard from "../../components/admin/StatCard";
import Toast from "../../components/admin/Toast.jsx";
import { useAdmin } from "../../context/AdminContext.jsx";

// All possible order statuses in ecommerce
const ALL_STATUSES = [
  "All",
  "Pending",
  "Processing",
  "Shipped",
  "Completed",
  "Cancelled",
  "On Hold",
  "Returned",
  "Refunded",
];

const Orders = () => {
  const { orders, updateOrderStatus } = useAdmin();
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleStatusUpdate = (id, status) => {
    updateOrderStatus(id, status);
    showToast(`Order ${id} marked as ${status}`);
  };

  const filteredOrders = useMemo(() => {
    let data = [...orders];
    if (filterStatus !== "All")
      data = data.filter((o) => o.status === filterStatus);
    if (searchQuery)
      data = data.filter(
        (o) =>
          o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          String(o.id).includes(searchQuery)
      );
    return data;
  }, [orders, filterStatus, searchQuery]);

  const stats = useMemo(() => {
    const statusCounts = {};
    ALL_STATUSES.slice(1).forEach(
      (status) =>
        (statusCounts[status] = orders.filter(
          (o) => o.status === status
        ).length)
    );
    return [
      {
        label: "Total Orders",
        value: orders.length,
        icon: Package,
        color: "text-blue-600",
        bg: "bg-blue-50",
      },
      ...Object.entries(statusCounts).map(([status, count]) => ({
        label: `${status} Orders`,
        value: count,
        icon:
          status === "Completed"
            ? Check
            : status === "Pending"
            ? Clock
            : Package,
        color:
          status === "Completed"
            ? "text-green-600"
            : status === "Pending"
            ? "text-yellow-600"
            : "text-indigo-600",
        bg: "bg-gray-50",
      })),
    ];
  }, [orders]);

  // Badge color mapping
  const statusColors = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-indigo-100 text-indigo-700",
    Shipped: "bg-blue-100 text-blue-700",
    Cancelled: "bg-red-100 text-red-700",
    "On Hold": "bg-orange-100 text-orange-700",
    Returned: "bg-pink-100 text-pink-700",
    Refunded: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="p-2 bg-[#FFF8E8] min-h-screen space-y-6">
      {toast.show && (
        <Toast {...toast} onClose={() => setToast({ ...toast, show: false })} />
      )}

      <h1 className="text-3xl font-black">Orders Management</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow">
        <div className="flex items-center gap-2">
          <label className="font-semibold">Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {ALL_STATUSES.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 border p-2 rounded-xl w-full md:w-64">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID or Customer"
            className="w-full outline-none"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="min-w-full table-auto text-sm md:text-base">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-400">
                  No orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">${order.total}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        statusColors[order.status] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex flex-wrap gap-2">
                    {/* Status dropdown for admin actions */}
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusUpdate(order.id, e.target.value)
                      }
                      className="p-1 border rounded-md"
                    >
                      {ALL_STATUSES.slice(1).map((statusOption) => (
                        <option key={statusOption} value={statusOption}>
                          {statusOption}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() =>
                        showToast(
                          `Viewing details of Order ${order.id}`,
                          "info"
                        )
                      }
                      className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                      <Edit size={16} /> View/Edit
                    </button>

                    <button
                      onClick={() => handleStatusUpdate(order.id, "Cancelled")}
                      disabled={order.status === "Cancelled"}
                      className={`flex items-center gap-1 px-3 py-1 rounded text-white ${
                        order.status === "Cancelled"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      <XCircle size={16} /> Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
