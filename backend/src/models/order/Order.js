
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
displayOrderId: String,   // 🔴 NEW (User ला दिसणारा Order ID)
razorpayOrderId: String, 
 invoiceNo: String,// 🔴 NEW (Gateway reference साठी)
  total: Number,    
  subtotal: Number,
gst: Number,
shipping: Number,
total: Number,

   address: Object,     // Total amount
  method: String,        // Razorpay / Paypal
  date: Date,            // Order date
  status: String,        // Paid / Delivered
  statusText: String,    // "Your order is placed"
  products: [
    {
      name: String,      // Product name
      detail: String,    // Description
      img: String,       // Product image
      qty: Number,       // Quantity
      price: Number      // Single product price
    }
  ]
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
