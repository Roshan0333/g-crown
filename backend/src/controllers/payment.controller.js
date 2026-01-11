import crypto from "crypto";
import razorpay from "../configs/razorpay.js";

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
        console.log("Razorpay Error:", err);   // 👈 हे add कर

    res.status(500).json({ error: err.message });
  }
};

// 👇 हा नवीन function add कर
export const verifyPayment = (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
