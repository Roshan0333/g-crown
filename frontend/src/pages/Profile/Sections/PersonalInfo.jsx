import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Navigation ke liye
import ProfilePic from "../../../assets/NewArrivalAssets/logos/ProfilePic.jpg";

const PersonalInfo = () => {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Update logic with 3-second success state
  const handleUpdate = () => {
    setIsUpdating(true);
    
    // Simulating API call
    setTimeout(() => {
      setIsUpdating(false);
      setShowSuccess(true);
      
      // 3 seconds baad success message hatane ke liye
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto font-sans relative ">
      
      {/* Back to Home Button - Top Right */}
      <button 
        onClick={() => navigate("/")} 
        className="absolute top-0 right-0 flex items-center gap-2 text-[#1B3022] hover:underline text-sm transition-all cursor-pointer"
      >
        <span>←</span> Back to Home
      </button>

      {/* Profile Image Section */}
      <div className="relative w-28 h-28 mb-4">
        <img
          src={ProfilePic}
          className="rounded-full w-full h-full object-cover border-2 border-white shadow-sm"
          alt="Profile"
        />
        {/* Active Status Dot */}
        <div className="absolute bottom-2 right-2 w-5 h-5 bg-[#1B3022] border-4 border-[#F9F4EA] rounded-full"></div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">First Name*</label>
          <input 
            type="text" 
            defaultValue="Preeti" 
            className="p-3 border border-gray-200 rounded-sm outline-none bg-white focus:border-[#1B3022] transition-colors shadow-sm" 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Last Name*</label>
          <input 
            type="text" 
            defaultValue="Sharma" 
            className="p-3 border border-gray-200 rounded-sm outline-none bg-white focus:border-[#1B3022] transition-colors shadow-sm" 
          />
        </div>

        <div className="flex flex-col gap-2 col-span-full">
          <label className="text-sm font-medium text-gray-700">Email*</label>
          <input 
            type="email" 
            defaultValue="example@gmail.com" 
            className="p-3 border border-gray-200 rounded-sm outline-none bg-white focus:border-[#1B3022] transition-colors shadow-sm w-full" 
          />
        </div>

        <div className="flex flex-col gap-2 col-span-full">
          <label className="text-sm font-medium text-gray-700">Phone Number*</label>
          <input 
            type="text" 
            defaultValue="91-9977377430" 
            className="p-3 border border-gray-200 outline-none rounded-sm bg-white focus:border-[#1B3022] transition-colors shadow-sm w-full" 
          />
        </div>

        <div className="flex flex-col gap-2 col-span-full relative">
          <label className="text-sm font-medium text-gray-700">Gender*</label>
          <select className="p-3 border rounded-sm border-gray-200 outline-none bg-white focus:border-[#1B3022] appearance-none cursor-pointer shadow-sm w-full">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          {/* Custom Dropdown Arrow */}
          <div className="absolute right-5 bottom-2 text-2xl  pointer-events-none text-gray-900">
            ▼
          </div>
        </div>
      </div>

      {/* Action Button with Success/Loading States */}
      <div className="mt-8 flex items-center gap-4 ">
        <button 
          onClick={handleUpdate}
          disabled={isUpdating}
          className={`px-12 py-4 text-sm font-medium tracking-wide transition-all duration-300 rounded-sm ${
            showSuccess 
            ? "bg-green-600 text-white" 
            : "bg-[#1B3022] text-white hover:bg-[#2a4532]"
          } shadow-lg active:scale-95`}
        >
          {isUpdating ? "Updating..." : showSuccess ? "Changes Updated! ✓" : "Update Changes"}
        </button>

        {showSuccess && (
          <span className="text-green-600 text-sm animate-pulse">
            Profile synchronized successfully!
          </span>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;