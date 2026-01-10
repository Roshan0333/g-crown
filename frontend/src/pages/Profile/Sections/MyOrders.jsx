import React from "react";
import Earing from "../../../assets/NewArrivalAssets/earrings-1.png"

const MyOrders = () => {
  const orderList = [
    {
      id: "#SDGTT456AD",
      total: "$3570.00",
      method: "Paypal",
      date: "24 December 2025",
      status: "Accepted",
      statusText: "Your Order has been Accepted",
      products: [
        { name: "Gold Earring", detail: "Earring | 4 Qty.", img: Earing },
        { name: "Gold Earring", detail: "Earring | 4 Qty.", img: Earing },
        { name: "Gold Earring", detail: "Earring | 4 Qty.", img: Earing },
        { name: "Gold Earring", detail: "Earring | 4 Qty.", img: Earing},
      ],
    },
    {
      id: "#SDGTT456AD",
      total: "$3570.00",
      method: "Paypal",
      date: "24 December 2025",
      status: "Delivered",
      statusText: "Your Order has been Delivered",
      products: [
        { name: "Gold Earring", detail: "Earring | 4 Qty.", img: Earing },
      ],
    },
  ];

  return (
    <div className="font-serif max-w-5xl animate-fadeIn px-2 sm:px-0">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <h2 className="text-xl sm:text-2xl font-medium text-[#1B3022]">Orders (2)</h2>
        <div className="flex items-center gap-2 text-sm w-full sm:w-auto">
          <span className="text-gray-600 whitespace-nowrap">Sort by :</span>
          <div className="relative flex-1 sm:flex-none">
            <select className="w-full appearance-none bg-[#F2EDE1] border border-[#D9D1C1] px-4 py-1.5 pr-8 rounded-sm outline-none text-sm cursor-pointer font-medium">
              <option>All</option>
              <option>Pending</option>
              <option>Delivered</option>
            </select>
            <span className="absolute right-3 top-2 pointer-events-none text-[10px]">▼</span>
          </div>
        </div>
      </div>

      {orderList.map((order, idx) => (
        <div key={idx} className="bg-white border border-gray-100 mb-6 sm:mb-10 overflow-hidden shadow-sm">
          
          {/* Order Header Bar: Mobile pe 2x2 grid, Desktop pe 4 columns */}
          <div className="bg-[#1B3022] text-white p-4 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] uppercase opacity-60 tracking-widest mb-1 truncate">Orders ID</p>
              <p className="text-[11px] sm:text-xs font-medium truncate">{order.id}</p>
            </div>
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] uppercase opacity-60 tracking-widest mb-1 truncate">Total Payment</p>
              <p className="text-[11px] sm:text-xs font-medium">{order.total}</p>
            </div>
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] uppercase opacity-60 tracking-widest mb-1 truncate">Payment Method</p>
              <p className="text-[11px] sm:text-xs font-medium">{order.method}</p>
            </div>
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] uppercase opacity-60 tracking-widest mb-1 truncate">Delivery Date</p>
              <p className="text-[11px] sm:text-xs font-medium">{order.date}</p>
            </div>
          </div>

          {/* Product Items List */}
          <div className="px-4 sm:px-6 py-2">
            {order.products.map((item, pIdx) => (
              <div key={pIdx} className="flex items-center gap-4 sm:gap-5 py-4 border-b border-gray-100 last:border-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#F9F9F9] rounded overflow-hidden flex-shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-[#1B3022]">{item.name}</h4>
                  <p className="text-[11px] sm:text-xs text-gray-400 mt-1 font-medium">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Status & Actions Footer: Mobile pe stack hoga */}
          <div className="px-4 sm:px-6 py-5 border-t border-gray-50 flex flex-col lg:flex-row justify-between items-start lg:items-center bg-[#FCFAFA] gap-4">
            <div className="flex items-center gap-3 w-full lg:w-auto">
              {/* Status Tag */}
              <span className={`px-3 py-1 text-[9px] sm:text-[10px] font-bold uppercase border rounded-sm ${
                order.status === "Accepted" 
                ? "bg-[#FFF5EE] text-[#F39C12] border-[#FFE5D2]" 
                : "bg-[#F0FFF4] text-[#4DB6AC] border-[#D1F2EB]"
              }`}>
                {order.status}
              </span>
              <p className="text-[12px] sm:text-[13px] text-gray-500 italic truncate">{order.statusText}</p>
            </div>

            {/* Buttons Group: Mobile pe grid or full width */}
            <div className="grid grid-cols-2 sm:flex items-center gap-2 sm:gap-3 w-full lg:w-auto">
              {order.status === "Accepted" ? (
                <>
                  <button className="bg-[#1B3022] text-white px-4 sm:px-6 py-2.5 text-[11px] sm:text-xs font-medium hover:bg-[#253d2c]">
                    Track Order
                  </button>
                  <button className="border border-[#1B3022] text-[#1B3022] px-4 sm:px-6 py-2.5 text-[11px] sm:text-xs font-medium bg-white">
                    Invoice
                  </button>
                  <button className="col-span-2 mt-2 sm:mt-0 text-[#FF5C5C] text-[11px] sm:text-xs font-bold px-4 text-center">
                    Cancel Order
                  </button>
                </>
              ) : (
                <>
                  <button className="bg-[#1B3022] text-white px-4 sm:px-8 py-2.5 text-[11px] sm:text-xs font-medium hover:bg-[#253d2c]">
                    Add Review
                  </button>
                  <button className="border border-[#1B3022] text-[#1B3022] px-4 sm:px-8 py-2.5 text-[11px] sm:text-xs font-medium bg-white">
                    Invoice
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;