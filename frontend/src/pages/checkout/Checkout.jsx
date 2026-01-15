import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, CreditCard, Truck, ShieldCheck, Lock, Landmark } from "lucide-react";
import { useCart } from "../../context/CartContext";
import axios from "axios";
import { useEffect} from "react";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  

  const [formData, setFormData] = useState({
    email: "", firstName: "", lastName: "", address: "",
    city: "", postalCode: "", phone: "", cardNum: "", expiry: "", cvc: ""
  });

  const GST_RATE = 0.18;

const { subtotal, gst, shipping, total } = useMemo(() => {
  const sub = getCartTotal();
  const gstAmount = sub * GST_RATE;
  const ship = sub > 0 ? 12.0 : 0;
  const grandTotal = sub + gstAmount + ship;

  return {
    subtotal: sub,
    gst: gstAmount,
    shipping: ship,
    total: grandTotal
  };
}, [getCartTotal]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedAddress) {
    alert("Please select delivery address first");
    return;
  }

  try {
    setIsProcessing(true);

    // Backend ला order create करायला call
    const { data } = await axios.post("http://localhost:3000/api/payment/create-order", {
      amount: total  // paise मध्ये
    });

    const options = {
      key: "rzp_test_S2ZQ4KbV345VDy", // इथे तुझा Razorpay Key टाक
      amount: data.amount,
      currency: "INR",
      name: "CROWN Jewellery",
      description: "Order Payment",
      order_id: data.id,
      
        handler: async function (response) {
          const formattedAddress = {
  fullName: `${selectedAddress.firstName} ${selectedAddress.lastName}`,
  mobile: selectedAddress.phone,
  addressLine: selectedAddress.address,
  city: selectedAddress.city, 
  state: selectedAddress.state,
  pincode: selectedAddress.zip
};


  // 🔴 NEW: verify API ला cartItems + total पाठव
  await axios.post("http://localhost:3000/api/payment/verify", {
    razorpay_order_id: response.razorpay_order_id,
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_signature: response.razorpay_signature,
    cartItems: cartItems,   // 🔴 NEW
    totalAmount: total,
    subtotal: subtotal,
    gst: gst,
    shipping: shipping,
    address: formattedAddress,
  });

 


  clearCart();
  navigate("/order-success");
},

      prefill: {
        name: selectedAddress.firstName,
        email: formData.email,
        contact: selectedAddress.phone
      },
      theme: {
        color: "#1C3A2C"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    setIsProcessing(false);
  } catch (error) {
    console.log(error);
    alert("Payment Failed");
    setIsProcessing(false);
  }
};

  
  useEffect(() => {
  axios.get("http://localhost:3000/api/addresses")
    .then(res => setAddresses(res.data))
    .catch(err => console.log(err));
}, []);


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#FAF7ED] min-h-screen font-serif relative">
      
      {/* Loading Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1C3A2C]/90 flex flex-col items-center justify-center text-white backdrop-blur-sm"
          >
            <motion.div 
              animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="w-16 h-16 border-t-2 border-[#D4AF37] rounded-full mb-4"
            />
            <p className="tracking-[0.4em] uppercase text-sm animate-pulse">Securing Your Elegance...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="flex justify-between items-center mb-12 border-b border-[#E5DDCC] pb-6">
          <button onClick={() => navigate("/cart")} className="flex items-center gap-2 text-[#1C3A2C] group">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm uppercase tracking-widest">Return to Bag</span>
          </button>
          <h1 className="text-2xl text-[#1C3A2C] font-medium tracking-tight">Secure Checkout</h1>
          <div className="hidden md:block w-32 h-px bg-[#E5DDCC]" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-12">
              
              {/* Step 1: Contact */}
              

              {/* Step 2: Shipping */}
             <section>
  <h2 className="text-xl text-[#1C3A2C] mb-6">Select Shipping Address</h2>

  {addresses.map(addr => (
    <div key={addr._id} className="border p-4 mb-3 bg-white flex justify-between">
      <label className="flex gap-3 cursor-pointer">
        <input
          type="radio"
          name="address"
          checked={selectedAddress?._id === addr._id}
          onChange={() => setSelectedAddress(addr)}
        />
        <div>
          <p className="font-bold">{addr.firstName} {addr.lastName}</p>
          <p>{addr.address}, {addr.city}, {addr.state} - {addr.zip}</p>
          <p>{addr.phone}</p>
        </div>
      </label>
      <button className="text-sm underline">Edit</button>
    </div>
  ))}
</section>


              {/* Step 3: Payment */}
              

              <button
  type="submit"
  disabled={!selectedAddress}
  className={`w-full py-5 ${
    !selectedAddress ? "bg-gray-400 cursor-not-allowed" : "bg-[#1C3A2C] text-white"
  }`}
>
  Pay ₹{total.toFixed(2)}
</button>

            </form>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-10 border border-[#E5DDCC] bg-white p-8 shadow-sm">
              <h2 className="text-xl text-[#1C3A2C] mb-8 border-b border-[#E5DDCC] pb-4">Bag Summary</h2>
              <div className="space-y-6 mb-8 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.image} className="w-16 h-20 object-cover" alt="" />
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-[#1C3A2C]">{item.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">{item.quantity} units</p>
                    </div>
                    <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-3 border-t border-[#E5DDCC] pt-6">

  <div className="flex justify-between text-sm text-gray-500">
    <span>Subtotal</span>
    <span>₹{subtotal.toFixed(2)}</span>
  </div>

  <div className="flex justify-between text-sm text-gray-500">
    <span>GST (18%)</span>
    <span>₹{gst.toFixed(2)}</span>
  </div>

  <div className="flex justify-between text-sm text-gray-500 italic">
    <span>Shipping</span>
    <span>₹{shipping.toFixed(2)}</span>
  </div>

  <div className="flex justify-between text-lg font-bold text-[#1C3A2C] border-t border-dashed border-[#E5DDCC] pt-4">
    <span>Grand Total</span>
    <span>₹{total.toFixed(2)}</span>
  </div>


              </div>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}