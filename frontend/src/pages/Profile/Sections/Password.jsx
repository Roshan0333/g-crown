import React, { useState } from "react";

const Password = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="font-serif w-full max-w-4xl animate-fadeIn relative ">
      <div className="max-w-xl space-y-8">
        
        {/* Current Password Field */}
        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-gray-800">Password *</label>
          <div className="relative">
            <input 
              type="password" 
              placeholder="Enter Password" 
              className="w-full p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] shadow-sm text-sm" 
            />
            {/* Eye Icon as seen in image */}
            <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755l.791.795ZM11.273 9.143 9.428 7.298a2 2 0 0 0-2.13 2.13l1.845 1.845a2.001 2.001 0 0 0 2.13-2.13ZM12 8a4 4 0 0 1-4 4c-.546 0-1.059-.11-1.523-.308l.837.838a5.913 5.913 0 0 0 1.939.313c4.12 0 7-4.5 7-4.5s-.507-1.023-1.334-1.857l.791.79zm-4 4a5.99 5.99 0 0 1-4.168-1.543 12.9 12.9 0 0 1-1.66-2.047 13.132 13.132 0 0 1 .195-.288C3.004 7.64 3.879 6.5 6 6.5c.312 0 .61.035.898.1l.73-.73A7.031 7.031 0 0 0 8 5.5c-4.12 0-7 4.5-7 4.5s.507 1.023 1.334 1.857l.791-.79z"/>
              </svg>
            </span>
          </div>
          {/* Forgot Password Link - Right Aligned */}
          <div className="flex justify-end">
            <span className="text-[11px] text-[#1B3022] underline cursor-pointer hover:font-bold transition-all">
              Forgot Password?
            </span>
          </div>
        </div>

        {/* New Password Field */}
        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-gray-800">New Password *</label>
          <div className="relative">
            <input 
              type="password" 
              placeholder="Enter Password" 
              className="w-full p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] shadow-sm text-sm" 
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755l.791.795ZM11.273 9.143 9.428 7.298a2 2 0 0 0-2.13 2.13l1.845 1.845a2.001 2.001 0 0 0 2.13-2.13ZM12 8a4 4 0 0 1-4 4c-.546 0-1.059-.11-1.523-.308l.837.838a5.913 5.913 0 0 0 1.939.313c4.12 0 7-4.5 7-4.5s-.507-1.023-1.334-1.857l.791.79zm-4 4a5.99 5.99 0 0 1-4.168-1.543 12.9 12.9 0 0 1-1.66-2.047 13.132 13.132 0 0 1 .195-.288C3.004 7.64 3.879 6.5 6 6.5c.312 0 .61.035.898.1l.73-.73A7.031 7.031 0 0 0 8 5.5c-4.12 0-7 4.5-7 4.5s.507 1.023 1.334 1.857l.791-.79z"/></svg>
            </span>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-gray-800">Confirm New Password *</label>
          <div className="relative">
            <input 
              type="password" 
              placeholder="Enter Password" 
              className="w-full p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] shadow-sm text-sm" 
            />
             <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755l.791.795ZM11.273 9.143 9.428 7.298a2 2 0 0 0-2.13 2.13l1.845 1.845a2.001 2.001 0 0 0 2.13-2.13ZM12 8a4 4 0 0 1-4 4c-.546 0-1.059-.11-1.523-.308l.837.838a5.913 5.913 0 0 0 1.939.313c4.12 0 7-4.5 7-4.5s-.507-1.023-1.334-1.857l.791.79zm-4 4a5.99 5.99 0 0 1-4.168-1.543 12.9 12.9 0 0 1-1.66-2.047 13.132 13.132 0 0 1 .195-.288C3.004 7.64 3.879 6.5 6 6.5c.312 0 .61.035.898.1l.73-.73A7.031 7.031 0 0 0 8 5.5c-4.12 0-7 4.5-7 4.5s.507 1.023 1.334 1.857l.791-.79z"/></svg>
            </span>
          </div>
        </div>

        {/* Update Button */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handleUpdate}
            disabled={isUpdating}
            className="bg-[#1B3022] text-white py-3.5 px-10 text-sm font-medium hover:bg-[#253d2c] transition-all shadow-md active:scale-95"
          >
            {isUpdating ? "Updating..." : showSuccess ? "Password Updated! ✓" : "Update Password"}
          </button>
          {showSuccess && <span className="text-green-600 text-xs animate-pulse font-medium italic">Your security settings have been saved.</span>}
        </div>
      </div>

     
    </div>
  );
};

export default Password;