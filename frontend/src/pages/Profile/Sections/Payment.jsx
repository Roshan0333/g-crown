import React from 'react';

const Payment = () => {
  const methods = [
    { name: 'Paypal', icon: 'https://cdn-icons-png.flaticon.com/128/174/174861.png', link: 'bessie.c@gmail.com' },
    { name: 'Visa', icon: 'https://cdn-icons-png.flaticon.com/128/16144/16144944.png', delete: true, link: '**** 4331' },
    { name: 'Google Pay', icon: 'https://cdn-icons-png.flaticon.com/128/6124/6124998.png', link: 'Not Linked' }
  ];

  return (
    <div className="font-serif max-w-4xl animate-fadeIn px-1 pb-10">
      
      {/* Visual Header for Mobile */}
      <h3 className="text-[11px] font-bold text-[#1B3022] uppercase tracking-[2px] mb-5 opacity-70">Saved Methods</h3>

      {/* Methods Card List */}
      <div className="grid grid-cols-1 gap-4 mb-10">
        {methods.map((m) => (
          <div key={m.name} className="group relative bg-white border border-gray-100 p-4 flex justify-between items-center rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                <img src={m.icon} alt={m.name} className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-bold text-[#1B3022] text-sm sm:text-base">{m.name}</p>
                <p className="text-[10px] sm:text-xs text-gray-400 font-sans">{m.link}</p>
              </div>
            </div>
            <button className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full transition-all ${
              m.delete 
              ? 'text-red-500 bg-red-50 hover:bg-red-500 hover:text-white' 
              : 'text-[#1B3022] bg-[#FBF6EA] hover:bg-[#1B3022] hover:text-white'
            }`}>
              {m.delete ? 'Remove' : 'Link'}
            </button>
          </div>
        ))}
      </div>

      {/* Modern Add Card Form */}
      <div className="bg-[#1B3022] rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
        {/* Background Decorative Circle */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
             <div className="w-6 h-6 bg-[#B38B59] rounded-full flex items-center justify-center shadow-inner">
               <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
             </div>
             <span className="text-lg sm:text-xl font-medium tracking-wide">Add New Card</span>
          </div>
          
          <div className="space-y-6">
             {/* Holder Name */}
             <div className="group">
               <label className="text-[10px] text-white/50 uppercase tracking-widest mb-2 block">Card Holder Name</label>
               <input 
                 type="text"
                 placeholder="Bessie Cooper" 
                 className="w-full bg-white/10 border-b border-white/20 p-3 outline-none focus:border-[#B38B59] transition-all text-sm placeholder:text-white/20 italic" 
               />
             </div>

             {/* Card Number */}
             <div className="group">
               <label className="text-[10px] text-white/50 uppercase tracking-widest mb-2 block">Card Number</label>
               <input 
                 type="text"
                 placeholder="0000 0000 0000 0000" 
                 className="w-full bg-white/10 border-b border-white/20 p-3 outline-none focus:border-[#B38B59] transition-all text-sm tracking-[4px]" 
               />
             </div>

             {/* Row for Expiry & CVV */}
             <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] text-white/50 uppercase tracking-widest mb-2 block">Expiry</label>
                  <input placeholder="MM/YY" className="w-full bg-white/10 border-b border-white/20 p-3 outline-none focus:border-[#B38B59] text-sm" />
                </div>
                <div>
                  <label className="text-[10px] text-white/50 uppercase tracking-widest mb-2 block">CVV</label>
                  <input placeholder="***" className="w-full bg-white/10 border-b border-white/20 p-3 outline-none focus:border-[#B38B59] text-sm" />
                </div>
             </div>

             {/* Save Card Toggle-style */}
             <div className="flex items-center gap-3 pt-2">
               <input type="checkbox" id="save" className="w-4 h-4 accent-[#B38B59] cursor-pointer" /> 
               <label htmlFor="save" className="text-[11px] text-white/60 cursor-pointer italic">Securely save for future checkout</label>
             </div>

             {/* Luxury Button */}
             <button className="w-full bg-[#B38B59] hover:bg-[#96754a] text-[#1B3022] py-4 rounded-xl text-xs font-black uppercase tracking-[3px] transition-all active:scale-95 shadow-lg mt-4">
               Confirm & Save Card
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;