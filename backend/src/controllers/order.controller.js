import Order from "../models/Order.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get My Orders
export const getOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

// Create Order
export const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  await newOrder.save();
  res.json({ message: "Order Created Successfully" });
};

// Update Status
export const updateOrderStatus = async (req, res) => {
  await Order.findByIdAndUpdate(req.params.id, {
    status: req.body.status,
    statusText: req.body.statusText
  });
  res.json({ message: "Order Status Updated" });
};

// Generate Invoice
export const generateInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.send("Order not found");

    const filePath = path.join(__dirname, "../templates/invoice.html");
    let html = fs.readFileSync(filePath, "utf8");

    let rows = "";
    order.products.forEach((p) => {
      rows += `
        <tr>
          <td>${p.name}</td>
          <td>${p.detail || ""}</td>
          <td>${p.qty}</td>
          <td>₹${p.price}</td>
          <td>₹${p.tax}</td>
          <td>₹${p.total}</td>
        </tr>
      `;
    });

    html = html
      .replace("{{invoiceNo}}", order.invoiceId)
      .replace("{{orderId}}", order.orderId)
      .replace("{{invoiceDate}}", order.date)
      .replace("{{billingName}}", "G Crown Customer")
      .replace("{{billingAddress}}", "Pune, Maharashtra")
      .replace("{{shippingName}}", "G Crown Customer")
      .replace("{{shippingAddress}}", "Pune, Maharashtra")
      .replace("{{productRows}}", rows)
      .replace("{{grandTotal}}", order.total);

    res.setHeader("Content-Type", "text/html");
    res.send(html);
  } catch (err) {
    console.log("INVOICE ERROR => ", err);
    res.status(500).send("Error generating invoice");
  }
};
export const saveOrder = async (req, res) => {
  try {
    const order = new Order(req.body); // mongoose model
    await order.save();
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

