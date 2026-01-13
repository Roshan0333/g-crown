import Order from "../../models/order/Order.js";
import pdf from "html-pdf";
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
// export const createOrder = async (req, res) => {
//   const newOrder = new Order(req.body);
//   await newOrder.save();
//   res.json({ message: "Order Created Successfully" });
// };
export const createOrder = async (req, res) => {
  const displayOrderId = "GC-" + Date.now();   // 🔴 same ID everywhere

  const newOrder = new Order({
    ...req.body,
    displayOrderId: displayOrderId,
    status: "Accepted"
  });

  await newOrder.save();
  res.json(newOrder);
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
    if (!order) return res.status(404).send("Order not found");

    const templatePath = path.join(__dirname, "../../templates/invoice.html");
    let html = fs.readFileSync(templatePath, "utf8");

    const shippingName = order.address
  ? order.address.firstName + " " + order.address.lastName
  : "Customer";

const shippingAddress = order.address
  ? `${order.address.address}, ${order.address.city}, ${order.address.state} - ${order.address.zip}, Ph: ${order.address.phone}`
  : "Not Available";

    let rows = "";
    order.products.forEach((p) => {
      rows += `
        <tr>
          <td>${p.name}</td>
          <td>${p.qty}</td>
          <td>₹${p.price}</td>
          <td>₹${p.qty * p.price}</td>
        </tr>
      `;
    });

    html = html
  .replace("{{invoiceNo}}", order.invoiceNo || "INV-GC-" + Date.now())
  .replace("{{orderId}}", order.displayOrderId)

  .replace("{{invoiceDate}}", new Date(order.date).toDateString())

  // Company Billing (fixed)
  .replace("{{billingName}}", "GC Jewellery Pvt Ltd")
  .replace("{{billingAddress}}", "FC Road, Pune, Maharashtra - 411004")

  // Customer Shipping (safe)
  .replace("{{shippingName}}", shippingName)
  .replace("{{shippingAddress}}", shippingAddress)

  .replace("{{productRows}}", rows)
  .replace("{{grandTotal}}", order.total);



    pdf.create(html).toStream((err, stream) => {
      if (err) {
        console.log("PDF ERROR =>", err);
        return res.status(500).send("PDF generation failed");
      }
      res.setHeader("Content-Type", "application/pdf");
      stream.pipe(res);
    });

  } catch (err) {
    console.log("INVOICE ERROR => ", err);
    res.status(500).send("Error generating invoice");
  }
};


// export const saveOrder = async (req, res) => {
//   try {
//     const order = new Order(req.body); // mongoose model
//     await order.save();
//     res.json({ success: true, order });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const saveOrder = async (req, res) => {
  try {
    const displayOrderId = "GC-" + Date.now();

    const order = new Order({
      ...req.body,
      displayOrderId: displayOrderId,
      status: "Accepted"
    });

    await order.save();
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const cancelOrder = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, {
      status: "Cancelled",
      statusText: "Your order has been cancelled by user"
    });
    res.json({ success: true, message: "Order Cancelled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
