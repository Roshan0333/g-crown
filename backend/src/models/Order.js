import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: String,
    // invoiceId: String,        // INV-1001
  total: String,
  method: String,
  date: String,
  status: String,
  statusText: String,
  products: [
    {
      name: String,
      detail: String,
      img: String,
      // qty: Number,          // किती नग
      // price: Number,        // एकाचा दर
      // tax: Number,          // GST
      // total: Number 
    }
  ]
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
