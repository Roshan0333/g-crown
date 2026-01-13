import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Edit3, Trash2, MapPin, Loader2, Plus } from "lucide-react";

const Address = () => {
  // --- States ---
  const [addresses, setAddresses] = useState([
    { id: 1, firstName: "Bessie", lastName: "Cooper", addr: "2456 Royal Ln. Mesa, New Mexico 234552", email: "bessie@example.com", phone: "02-33224455" },
    { id: 2, firstName: "Bessie", lastName: "Cooper", addr: "6446 Elgin St. Celina, New York 102532", email: "bessie@example.com", phone: "02-33224455" }
  ]);

  // Modal & Loading States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form States
  const initialFormState = { firstName: "", lastName: "", addr: "", email: "", phone: "" };
  const [newAddress, setNewAddress] = useState(initialFormState); // For the "Add" form
  const [editingAddress, setEditingAddress] = useState(null);    // For the "Edit" modal

  // --- Handlers ---

  // Handle Input Changes for Add Form
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  // Handle Input Changes for Edit Modal
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingAddress(prev => ({ ...prev, [name]: value }));
  };

  // 1. ADD Logic
  const handleAddNewAddress = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API delay
    setTimeout(() => {
      const id = Date.now(); // Generate unique ID
      setAddresses(prev => [...prev, { ...newAddress, id }]);
      setNewAddress(initialFormState); // Clear form
      setIsUpdating(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  // 2. EDIT Logic (Open Modal)
  const openEditModal = (address) => {
    setEditingAddress({ ...address });
    setIsModalOpen(true);
  };

  // 3. UPDATE Logic (Inside Modal)
  const handleUpdateAddress = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    
    setTimeout(() => {
      setAddresses(prev => prev.map(addr => 
        addr.id === editingAddress.id ? editingAddress : addr
      ));
      setIsUpdating(false);
      setIsModalOpen(false);
      setEditingAddress(null);
    }, 800);
  };

  // 4. DELETE Logic
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this address?")) {
      setAddresses(prev => prev.filter(addr => addr.id !== id));
    }
  };

  return (
    <div className="font-serif max-w-4xl animate-fadeIn relative pb-20">
      
      {/* --- SAVED ADDRESSES SECTION --- */}
      <h3 className="text-xl font-medium text-[#1B3022] mb-6 uppercase tracking-widest">Saved Addresses</h3>
      <div className="bg-white border border-gray-100 p-6 space-y-0 mb-10 shadow-sm rounded-lg">
        <AnimatePresence mode="popLayout">
          {addresses.map((item, i) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -20 }}
              key={item.id} 
              className={`flex justify-between items-start py-5 ${i === 0 ? "pt-0" : "border-t border-gray-50 pt-5"}`}
            >
              <div className="space-y-1">
                <p className="font-bold text-[#1B3022] text-lg">{item.firstName} {item.lastName}</p>
                <p className="text-sm text-gray-500 tracking-tight">{item.addr}</p>
              </div>
              <div className="flex gap-6 text-[13px] font-medium mt-1 uppercase tracking-widest">
                <button onClick={() => openEditModal(item)} className="text-black hover:text-[#CBA135] transition-colors flex items-center gap-1">
                  <Edit3 size={14} /> Edit
                </button>
                <button onClick={() => handleDelete(item.id)} className="text-[#FF5C5C] hover:opacity-70 transition-colors flex items-center gap-1">
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- ADD NEW ADDRESS FORM (Static Theme) --- */}
      <h3 className="text-xl font-medium text-[#1B3022] mb-8 uppercase tracking-widest">Add New Address</h3>
      
      <form onSubmit={handleAddNewAddress} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 bg-white/50 p-6 border border-gray-100 rounded-lg">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-700">First Name*</label>
          <input required name="firstName" value={newAddress.firstName} onChange={handleAddChange} placeholder="Bessie" className="p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] text-sm shadow-sm" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-700">Last Name*</label>
          <input required name="lastName" value={newAddress.lastName} onChange={handleAddChange} placeholder="Cooper" className="p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] text-sm shadow-sm" />
        </div>

        <div className="col-span-full flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-700">Full Address*</label>
          <input required name="addr" value={newAddress.addr} onChange={handleAddChange} placeholder="Enter your full street address" className="p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] text-sm shadow-sm" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-700">Phone Number*</label>
          <input required name="phone" value={newAddress.phone} onChange={handleAddChange} placeholder="02-33224455" className="p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] text-sm shadow-sm" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-700">Email Address*</label>
          <input required type="email" name="email" value={newAddress.email} onChange={handleAddChange} placeholder="example@gmail.com" className="p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] text-sm shadow-sm" />
        </div>

        <div className="col-span-full mt-4 flex items-center gap-4">
          <button 
            type="submit"
            disabled={isUpdating}
            className="bg-[#1B3022] text-white py-3.5 px-10 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-[#253d2c] flex items-center gap-2"
          >
            {isUpdating ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
            {isUpdating ? "Saving..." : "Add Address"}
          </button>
          {showSuccess && <span className="text-green-600 text-sm italic animate-pulse">✓ Address added successfully!</span>}
        </div>
      </form>

      {/* --- EDIT POPUP MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#1B3022]/40 backdrop-blur-sm" />

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-[#FDF9F0] p-8 shadow-2xl border border-white/20"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute right-6 top-6 text-gray-400 hover:text-black">
                <X size={24} />
              </button>

              <div className="mb-8">
                <h2 className="text-2xl font-normal text-[#1B3022]">Edit Address</h2>
                <p className="text-[#CBA135] text-xs font-bold uppercase tracking-widest mt-1">Update your delivery preferences</p>
              </div>

              <form onSubmit={handleUpdateAddress} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-700">First Name*</label>
                  <input required name="firstName" value={editingAddress?.firstName} onChange={handleEditChange} className="p-3 border border-gray-200 outline-none focus:border-[#CBA135]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-700">Last Name*</label>
                  <input required name="lastName" value={editingAddress?.lastName} onChange={handleEditChange} className="p-3 border border-gray-200 outline-none focus:border-[#CBA135]" />
                </div>
                <div className="col-span-full flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-700">Address*</label>
                  <input required name="addr" value={editingAddress?.addr} onChange={handleEditChange} className="p-3 border border-gray-200 outline-none focus:border-[#CBA135]" />
                </div>
                <div className="col-span-full mt-4">
                  <button type="submit" disabled={isUpdating} className="w-full bg-[#1B3022] text-white py-4 uppercase text-xs font-bold tracking-[0.2em] flex items-center justify-center gap-2">
                    {isUpdating ? <Loader2 className="animate-spin" size={16} /> : "Update Address"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Address;