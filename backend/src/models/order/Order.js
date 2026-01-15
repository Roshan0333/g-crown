
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
displayOrderId: String,   // 🔴 NEW (User ला दिसणारा Order ID)
razorpayOrderId: String, 
  paymentId: String, 
 invoiceNo: String,
 userName: String,
  userMobile: String,
  total: Number,    
  
  subtotal: Number,
gst: Number,
shipping: Number,
refundAmount: Number,
refundDate: Date,
refundTransactionId: String,


   address: {
  fullName: String,
  mobile: String,
  addressLine: String,
  city: String,
  state: String,
  pincode: String
},
    // Total amount
  method: String,        // Razorpay / Paypal
  date: {
  type: Date,
  default: Date.now   // 🔴 Auto current date save होईल
},
            // Order date
  orderStatus: {
  type: String,
  enum: ["Confirmed", "Accepted", "Shipped", "Delivered", "Cancelled", "Returned",
    "Refunded"],
  default: "Confirmed"
  },

  statusText: String,    // "Your order is placed"
  products: [
    {
      name: String,      // Product name
      detail: String,  
      carat: String,   // Description
       productImage: [String],       // Product image
      qty: Number,       // Quantity
      price: Number      // Single product price
    }
  ]
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
