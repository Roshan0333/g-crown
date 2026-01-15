
import crypto from "crypto";
import razorpay from "../../configs/razorpay.js";
import Order from "../../models/order/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // rupees

    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      receipt: "order_" + Date.now()
    });

    res.json(order);
  } catch (err) {
        

    res.status(500).json({ error: err.message });
  }
};



export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cartItems,
      totalAmount,
      address,
      subtotal,
  gst,
  shipping,
  productImage
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const invoiceNo = "INV-GC-" + Date.now();   // Example: INV-GC-17000001234

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false });
    }
    // 🔴 Custom Order ID generate
const generateOrderId = () => {
  const year = new Date().getFullYear();        // 2026
  const day = String(new Date().getDate()).padStart(2, "0"); 
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000); // 4 digit number

  return `#GC-${year}-${day}${month}-${random}`;
};

const customOrderId = generateOrderId();


    const orderData = {
      userName: address.fullName,
      userMobile: address.mobile,
      displayOrderId: customOrderId,          // 🔴 User ला दिसणारा
      razorpayOrderId: razorpay_order_id,
      invoiceNo: invoiceNo,
      total: totalAmount,
      method: "Razorpay",
      date: new Date(),
      address: address,
  subtotal: subtotal,   // ✔
  gst: gst,             // ✔
  shipping: shipping,   // ✔
  
      orderStatus: "Confirmed",
     
      statusText: "Your order is placed",
      products: cartItems.map(item => ({
        name: item.name,
        detail: item.description,
        productImage: item.productImage,
        qty: item.quantity,   // <-- fix
        price: item.price
      }))
    };

    // फक्त हाच एक ठेवा
    const newOrder = new Order(orderData);
    await newOrder.save();  

    res.status(200).json({ success: true });

  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
};
