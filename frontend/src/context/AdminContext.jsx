import React, { createContext, useContext, useState } from "react";

/* ================= INITIAL DATA ================= */

const initialProducts = [
  {
    id: 1,
    name: "Gold Necklace",
    sku: "GN001",
    category: "Necklace",
    price: 50000,
    stockStatus: "In Stock",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Diamond Ring",
    sku: "DR001",
    category: "Ring",
    price: 75000,
    stockStatus: "Out of Stock",
    rating: 4.8,
  },
];

const initialOrders = [
  { id: 1001, customer: "John Doe", total: 250, status: "Completed", date: "2026-01-10" },
  { id: 1002, customer: "Jane Smith", total: 120, status: "Pending", date: "2026-01-11" },
];

const initialShowrooms = [
  {
    id: 1,
    name: "GCrown Mumbai",
    street: "123 MG Road",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    country: "India",
    timings: "10:00 AM - 08:00 PM",
    phone: "9876543210",
    image: "",
    mapEmbed: "",
  },
  {
    id: 2,
    name: "GCrown Delhi",
    street: "45 Connaught Place",
    city: "Delhi",
    state: "Delhi",
    pincode: "110001",
    country: "India",
    timings: "10:00 AM - 08:00 PM",
    phone: "9876543211",
    image: "",
    mapEmbed: "",
  },
];

const initialCustomers = [
  { id: 1, name: "Vishal Kushwaha", email: "vishal@example.com", contact: "9876543210", gender: "Male", createdAt: "2026-01-01" },
  { id: 2, name: "Anjali Sharma", email: "anjali@example.com", contact: "9876543211", gender: "Female", createdAt: "2026-01-05" },
];

/* ================= CONTEXT ================= */

export const AdminContext = createContext();

/* ================= HELPER ================= */

const generateId = () => Date.now();

/* ================= PROVIDER ================= */

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [showrooms, setShowrooms] = useState(initialShowrooms);
  const [customers, setCustomers] = useState(initialCustomers);
   const [webBanners, setWebBanners] = useState([]);

  /* -------- PRODUCTS -------- */
  const addOrUpdateProduct = (product) => {
    setProducts((prev) => {
      if (product?.id) {
        return prev.map((p) => (p.id === product.id ? { ...p, ...product } : p));
      }
      return [...prev, { ...product, id: generateId() }];
    });
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  /* -------- ORDERS -------- */
  const updateOrderStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  /* -------- CUSTOMERS -------- */
  const addCustomer = (customer) => {
    setCustomers((prev) => [...prev, { ...customer, id: generateId() }]);
  };

  /* -------- SHOWROOMS (FIXED & CLEAN) -------- */
  const addShowroom = (showroom) => {
    setShowrooms((prev) => [...prev, { ...showroom, id: generateId() }]);
  };

  const updateShowroom = (showroom) => {
    setShowrooms((prev) =>
      prev.map((s) => (s.id === showroom.id ? { ...s, ...showroom } : s))
    );
  };

  const deleteShowroom = (id) => {
    setShowrooms((prev) => prev.filter((s) => s.id !== id));
  };

  // ===== Web Banners Functions =====
  const addWebBanner = (banner) => {
    setWebBanners((prev) => [...prev, { ...banner, id: Date.now() }]);
  };

  const updateWebBanner = (banner) => {
    setWebBanners((prev) =>
      prev.map((b) => (b.id === banner.id ? { ...b, ...banner } : b))
    );
  };

  const deleteWebBanner = (id) => {
    setWebBanners((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <AdminContext.Provider
      value={{
        /* products */
        products,
        addOrUpdateProduct,
        deleteProduct,

        /* orders */
        orders,
        updateOrderStatus,

        /* showrooms */
        showrooms,
        addShowroom,
        updateShowroom,
        deleteShowroom,

        /* customers */
        customers,
        addCustomer,
         webBanners,          
        addWebBanner,        
        updateWebBanner,     
        deleteWebBanner,     
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

/* ================= CUSTOM HOOK ================= */

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used inside AdminProvider");
  }
  return context;
};
