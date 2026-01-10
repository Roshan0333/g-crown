import React, { useState, useReducer, useMemo } from "react";
import { 
  ShieldCheck, Zap, BarChart3, Users, Settings, 
  CreditCard, Globe, Bell, Mail, Database, 
  Trash2, Plus, Save, Eye, RefreshCcw, Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * 1. THE GLOBAL SITE BLUEPRINT
 * This is the ultimate JSON object. Every value here is tied to a 
 * dynamic component on the frontend.
 */
const MASTER_SYSTEM_CONFIG = {
  store: {
    name: "G-CROWN LUXURY",
    currency: "INR",
    taxRate: 18,
    lowStockThreshold: 5,
    orderPrefix: "GC-",
  },
  frontend: {
    maintenanceMode: false,
    showNewsletterPopUp: true,
    enableReviews: true,
    homeHeroVideo: "https://cdn.jewelry.com/hero.mp4",
  },
  shipping: [
    { zone: "Domestic (India)", rate: 0, minOrder: 5000 },
    { zone: "International", rate: 2500, minOrder: 100000 },
  ],
  inventory: [
    { id: 101, name: "Victorian Emerald Set", price: 125000, stock: 3, category: "Sets" },
    { id: 102, name: "Solitaire Engagement Ring", price: 85000, stock: 12, category: "Rings" },
  ],
  customers: [
    { id: 1, name: "Arjun Mehta", email: "arjun@mehta.com", orders: 4, spend: 450000 },
  ]
};

export default function UniversalAdmin() {
  const [activeTab, setActiveTab] = useState("overview");
  const [config, setConfig] = useState(MASTER_SYSTEM_CONFIG);
  const [isUpdating, setIsUpdating] = useState(false);

  // --- CORE ENGINE FUNCTIONS ---
  const handleUpdate = (path, value) => {
    // Standard deep-path update logic
    const keys = path.split('.');
    const newConfig = { ...config };
    let current = newConfig;
    for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
    current[keys[keys.length - 1]] = value;
    setConfig(newConfig);
  };

  const saveToCloud = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      alert("PRODUCTION DATABASE UPDATED: Changes are now live.");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-[#0A0D0C] text-[#E5DDCC] font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. POWER SIDEBAR */}
      <aside className="w-24 lg:w-80 bg-[#0F1312] border-r border-white/5 flex flex-col p-6 h-screen sticky top-0">
        <div className="mb-12 px-4">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="text-[#D4AF37]" size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Security Active</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#D4AF37]">SYSTEM 01</h1>
        </div>

        <nav className="space-y-1 flex-grow overflow-y-auto no-scrollbar">
          <SectionLabel label="Operations" />
          <NavBtn active={activeTab === "overview"} icon={<BarChart3/>} label="Command Center" onClick={() => setActiveTab("overview")} />
          <NavBtn active={activeTab === "inventory"} icon={<Database/>} label="Vault (Inventory)" onClick={() => setActiveTab("inventory")} />
          <NavBtn active={activeTab === "shipping"} icon={<Globe/>} label="Logistics" onClick={() => setActiveTab("shipping")} />
          
          <SectionLabel label="Website Control" />
          <NavBtn active={activeTab === "frontend"} icon={<Zap/>} label="Frontend Logic" onClick={() => setActiveTab("frontend")} />
          <NavBtn active={activeTab === "customers"} icon={<Users/>} label="Customer Relations" onClick={() => setActiveTab("customers")} />
          <NavBtn active={activeTab === "settings"} icon={<Settings/>} label="Global Parameters" onClick={() => setActiveTab("settings")} />
        </nav>

        <button 
          onClick={saveToCloud}
          className="mt-6 w-full bg-[#D4AF37] hover:bg-[#F5D170] text-black font-black py-4 rounded-sm transition-all flex items-center justify-center gap-3 uppercase text-[11px] tracking-widest"
        >
          {isUpdating ? <RefreshCcw className="animate-spin" /> : <Lock size={16}/>}
          Sync to Production
        </button>
      </aside>

      {/* 2. DYNAMIC WORKSPACE */}
      <main className="flex-1 p-8 lg:p-16 h-screen overflow-y-auto bg-gradient-to-br from-[#0A0D0C] to-[#121615]">
        
        {/* TAB: COMMAND CENTER (Financials) */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <header>
              <h2 className="text-5xl font-serif font-bold mb-4">Command Center</h2>
              <p className="text-white/40 max-w-2xl font-light leading-relaxed">System-wide performance monitoring. Real-time revenue tracking and operational health data.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatCard label="Net Valuation" value="₹8.4M" delta="+12%" />
              <StatCard label="conversion Rate" value="3.2%" delta="+0.4%" />
              <StatCard label="Refund Ratio" value="0.08%" delta="-2%" color="text-green-500" />
              <StatCard label="Avg Order" value="₹42K" delta="+5%" />
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-lg">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <Bell size={16} className="text-[#D4AF37]"/> System Notifications
              </h3>
              <div className="space-y-4">
                <AlertItem type="warning" msg="Low stock detected: 'Solitaire Engagement Ring' (2 units left)" />
                <AlertItem type="success" msg="International Shipping API connected successfully." />
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB: FRONTEND LOGIC (The toggle for the whole site) */}
        {activeTab === "frontend" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-4xl">
            <h2 className="text-4xl font-serif font-bold">Frontend Logic</h2>
            
            <ControlPanel title="Critical Site Toggles">
              <ToggleRow 
                label="Maintenance Mode" 
                desc="Instantly lock the website for updates. Shows a branded 'Coming Back Soon' page."
                checked={config.frontend.maintenanceMode}
                onChange={(val) => handleUpdate('frontend.maintenanceMode', val)}
              />
              <ToggleRow 
                label="Enable Customer Reviews" 
                desc="Show or hide the review section on all product pages."
                checked={config.frontend.enableReviews}
                onChange={(val) => handleUpdate('frontend.enableReviews', val)}
              />
            </ControlPanel>

            <ControlPanel title="Hero Media Assets">
               <div className="space-y-4">
                 <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Master Video URL</p>
                 <input 
                    className="w-full bg-white/5 border border-white/10 p-4 rounded text-sm outline-none focus:border-[#D4AF37]" 
                    value={config.frontend.homeHeroVideo}
                    onChange={(e) => handleUpdate('frontend.homeHeroVideo', e.target.value)}
                 />
               </div>
            </ControlPanel>
          </motion.div>
        )}

        {/* TAB: LOGISTICS */}
        {activeTab === "shipping" && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <h2 className="text-4xl font-serif font-bold">Global Logistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {config.shipping.map((zone, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-8">
                    <h4 className="text-[#D4AF37] font-bold text-lg mb-4">{zone.zone}</h4>
                    <div className="space-y-4">
                      <EditableField label="Base Shipping Rate" value={zone.rate} unit="₹" />
                      <EditableField label="Minimum Free Order" value={zone.minOrder} unit="₹" />
                    </div>
                  </div>
                ))}
              </div>
           </motion.div>
        )}

      </main>
    </div>
  );
}

/* ---------------- OPERATIONAL UI ATOMS ---------------- */

const NavBtn = ({ active, icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-4 w-full p-4 rounded-sm transition-all group ${
      active ? "bg-[#D4AF37] text-black font-black" : "text-white/40 hover:text-white hover:bg-white/5"
    }`}
  >
    <span className={active ? "text-black" : "group-hover:text-[#D4AF37]"}>{icon}</span>
    <span className="text-[11px] uppercase tracking-[0.2em]">{label}</span>
  </button>
);

const StatCard = ({ label, value, delta, color = "text-[#D4AF37]" }) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
    <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-2">{label}</p>
    <p className="text-3xl font-bold mb-1">{value}</p>
    <p className={`text-[10px] font-bold ${delta.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>{delta} vs last month</p>
  </div>
);

const SectionLabel = ({ label }) => (
  <p className="px-4 pt-8 pb-4 text-[9px] font-bold text-white/20 uppercase tracking-[0.5em]">{label}</p>
);

const ToggleRow = ({ label, desc, checked, onChange }) => (
  <div className="flex items-center justify-between py-6 border-b border-white/5 last:border-0">
    <div className="max-w-md">
      <h4 className="text-sm font-bold mb-1">{label}</h4>
      <p className="text-xs text-white/40">{desc}</p>
    </div>
    <button 
      onClick={() => onChange(!checked)}
      className={`w-14 h-7 rounded-full transition-all relative ${checked ? 'bg-[#D4AF37]' : 'bg-white/10'}`}
    >
      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${checked ? 'right-1' : 'left-1'}`} />
    </button>
  </div>
);

const ControlPanel = ({ title, children }) => (
  <div className="bg-white/5 border border-white/10 p-10 rounded-sm">
    <h3 className="text-xs uppercase font-black tracking-[0.3em] text-white/20 mb-8">{title}</h3>
    {children}
  </div>
);

const EditableField = ({ label, value, unit }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] uppercase font-bold text-white/30">{label}</label>
    <div className="flex items-center gap-2 border-b border-white/10 pb-2">
      <span className="text-xs text-[#D4AF37] font-bold">{unit}</span>
      <input defaultValue={value} className="bg-transparent outline-none font-mono text-sm w-full" />
    </div>
  </div>
);

const AlertItem = ({ type, msg }) => (
  <div className={`text-xs p-4 border-l-4 ${type === 'warning' ? 'border-yellow-600 bg-yellow-600/5' : 'border-green-600 bg-green-600/5'} font-medium`}>
    {msg}
  </div>
);