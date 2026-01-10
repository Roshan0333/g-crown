import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, CreditCard, Truck, ShieldCheck, Lock, Landmark } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    email: "", firstName: "", lastName: "", address: "",
    city: "", postalCode: "", phone: "", cardNum: "", expiry: "", cvc: ""
  });

  const { subtotal, shipping, total } = useMemo(() => {
    const sub = getCartTotal();
    const ship = sub > 0 ? 12.00 : 0;
    return { subtotal: sub, shipping: ship, total: sub + ship };
  }, [getCartTotal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const finalOrderDetails = {
    items: [...cartItems], // Spreading to create a snapshot
    subtotal: getCartTotal(),
    orderId: `#KAASHI-${Math.floor(Math.random() * 1000000)}`,
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    }

    // Simulate luxury payment gateway processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart(); // Clean up cart after successful "purchase"
      navigate("/order-success", { state: { order: finalOrderDetails } });
    }, 3000);

    clearCart();
  };

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
              <section>
                <h2 className="text-xl text-[#1C3A2C] mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#1C3A2C] text-white flex items-center justify-center text-xs font-sans">1</span>
                  Contact Information
                </h2>
                <input required type="email" name="email" placeholder="Email for Order Confirmation" onChange={handleInputChange} className="w-full bg-white border border-[#E5DDCC] p-4 outline-none focus:border-[#1C3A2C] transition-colors" />
              </section>

              {/* Step 2: Shipping */}
              <section>
                <h2 className="text-xl text-[#1C3A2C] mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#1C3A2C] text-white flex items-center justify-center text-xs font-sans">2</span>
                  Shipping Destination
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required name="firstName" placeholder="First Name" onChange={handleInputChange} className="bg-white border border-[#E5DDCC] p-4 outline-none focus:border-[#1C3A2C]" />
                  <input required name="lastName" placeholder="Last Name" onChange={handleInputChange} className="bg-white border border-[#E5DDCC] p-4 outline-none focus:border-[#1C3A2C]" />
                  <input required name="address" placeholder="Street Address" onChange={handleInputChange} className="md:col-span-2 bg-white border border-[#E5DDCC] p-4 outline-none focus:border-[#1C3A2C]" />
                  <input required name="city" placeholder="City" onChange={handleInputChange} className="bg-white border border-[#E5DDCC] p-4 outline-none focus:border-[#1C3A2C]" />
                  <input required name="postalCode" placeholder="Postal Code" onChange={handleInputChange} className="bg-white border border-[#E5DDCC] p-4 outline-none focus:border-[#1C3A2C]" />
                </div>
              </section>

              {/* Step 3: Payment */}
              <section>
                <h2 className="text-xl text-[#1C3A2C] mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#1C3A2C] text-white flex items-center justify-center text-xs font-sans">3</span>
                  Payment Method
                </h2>
                <div className="border border-[#E5DDCC] bg-white divide-y divide-[#E5DDCC]">
                  {/* Card Option */}
                  <div className={`p-4 transition-colors ${paymentMethod === 'card' ? 'bg-[#FAF7ED]' : ''}`}>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-[#1C3A2C]" />
                      <CreditCard size={18} />
                      <span className="text-sm font-medium">Credit / Debit Card</span>
                    </label>
                    {paymentMethod === 'card' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-4 space-y-4 overflow-hidden">
                        <input required name="cardNum" placeholder="Card Number" className="w-full p-3 border border-[#E5DDCC] text-sm outline-none" />
                        <div className="flex gap-4">
                          <input required name="expiry" placeholder="MM/YY" className="w-1/2 p-3 border border-[#E5DDCC] text-sm outline-none" />
                          <input required name="cvc" placeholder="CVC" className="w-1/2 p-3 border border-[#E5DDCC] text-sm outline-none" />
                        </div>
                      </motion.div>
                    )}
                  </div>
                  {/* Bank Transfer Option */}
                  <div className={`p-4 transition-colors ${paymentMethod === 'bank' ? 'bg-[#FAF7ED]' : ''}`}>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} className="accent-[#1C3A2C]" />
                      <Landmark size={18} />
                      <span className="text-sm font-medium">Direct Bank Transfer</span>
                    </label>
                  </div>
                </div>
              </section>

              <button type="submit" className="w-full bg-[#1C3A2C] text-white py-5 text-sm uppercase tracking-[0.3em] font-semibold hover:bg-[#152e23] transition-all flex items-center justify-center gap-3">
                <Lock size={16} /> Pay ${total.toFixed(2)}
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
                <div className="flex justify-between text-sm text-gray-500 italic"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
                <div className="flex justify-between text-lg font-bold text-[#1C3A2C] border-t border-dashed border-[#E5DDCC] pt-4">
                  <span>Grand Total</span><span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}