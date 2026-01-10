import React, { useState } from "react";

const Address = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddAddress = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="font-serif max-w-4xl animate-fadeIn">
      {/* Saved Addresses Section */}
      <div className="bg-white border border-gray-100 p-6 space-y-0 mb-10 shadow-sm">
        {[
          { name: "Bessie Cooper", addr: "2456 Royal Ln. Mesa, New Mexico 234552" },
          { name: "Bessie Cooper", addr: "6446 Elgin St. Celina, New York 102532" }
        ].map((item, i) => (
          <div key={i} className={`flex justify-between items-start py-5 ${i === 0 ? "border-b border-gray-100 pt-0" : "pt-5"}`}>
            <div className="space-y-1">
              <p className="font-bold text-[#1B3022] text-lg">{item.name}</p>
              <p className="text-sm text-gray-500 tracking-tight">{item.addr}</p>
            </div>
            <div className="flex gap-6 text-[13px] font-medium mt-1">
              <button className="text-black hover:underline">Edit</button>
              <button className="text-[#FF5C5C] hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-medium text-[#1B3022] mb-8">Add New Address</h3>
      
      {/* Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        
        {/* Row 1: First & Last Name */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-700">First Name*</label>
          <input placeholder="Bessie" className="p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] text-sm shadow-sm" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-700">Last Name*</label>
          <input placeholder="Cooper" className="p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] text-sm shadow-sm" />
        </div>

        {/* Dropdowns Section */}
        {[
          { label: "Country*", placeholder: "Select Country" },
          { label: "Address*", placeholder: "Enter Address" },
          { label: "City*", placeholder: "Select City" },
          { label: "State*", placeholder: "Select State" },
          { label: "Zip Code*", placeholder: "Enter Zip Code" }
        ].map((field, index) => (
          <div key={index} className="col-span-full flex flex-col gap-2 relative">
            <label className="text-xs font-semibold text-gray-700">{field.label}</label>
            <select className="w-full p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] text-gray-400 text-sm appearance-none shadow-sm cursor-pointer">
              <option>{field.placeholder}</option>
            </select>
            <div className="absolute right-4 bottom-4 pointer-events-none text-gray-400 text-[10px]">▼</div>
          </div>
        ))}

        {/* Row 3: Phone & Email */}
        <div className="col-span-full flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-700">Phone Number*</label>
          <input placeholder="02-33224455" className="p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] text-sm shadow-sm" />
        </div>
        <div className="col-span-full flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-700">Email*</label>
          <input placeholder="example@gmail.com" className="p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] text-sm shadow-sm" />
        </div>

        {/* Action Button */}
        <div className="col-span-full mt-4 flex items-center gap-4">
          <button 
            onClick={handleAddAddress}
            disabled={isUpdating}
            className={`bg-[#1B3022] text-white rounded-md py-3.5 px-10 text-sm font-medium transition-all active:scale-95 shadow-lg ${isUpdating ? 'opacity-70' : 'hover:bg-[#253d2c]'}`}
          >
            {isUpdating ? "Saving..." : showSuccess ? "Address Saved! ✓" : "Add Address"}
          </button>
          {showSuccess && <span className="text-green-600 text-sm italic animate-pulse">New address added to your list.</span>}
        </div>
      </div>
    </div>
  );
};

export default Address;