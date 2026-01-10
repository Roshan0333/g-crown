import React, { useState, useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  LayoutDashboard, Package, ShoppingBag, Search, Trash2, Edit, X, 
  Sparkles, ShieldCheck, Plus, MinusCircle, PlusCircle, Check, 
  Bell, MoreHorizontal, TrendingUp, ArrowUpRight
} from 'lucide-react';

// --- MOCK DATA ---
const REVENUE_DATA = [
  { day: 'Mon', amount: 45000 },
  { day: 'Tue', amount: 52000 },
  { day: 'Wed', amount: 48000 },
  { day: 'Thu', amount: 61000 },
  { day: 'Fri', amount: 55000 },
  { day: 'Sat', amount: 67000 },
  { day: 'Sun', amount: 72000 },
];

const INITIAL_PRODUCTS = [
  { id: 1, name: "Gold Bridal Solitaire", price: 450000, category: "Rings", isNewArrival: true, stock: 12 },
  { id: 2, name: "Heritage Polki Necklace", price: 850000, category: "Necklaces", isNewArrival: false, stock: 5 },
  { id: 3, name: "Temple Work Jhumkas", price: 125000, category: "Earrings", isNewArrival: true, stock: 20 },
  { id: 4, name: "Diamond Tennis Bracelet", price: 320000, category: "Bracelets", isNewArrival: false, stock: 8 },
];

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [toast, setToast] = useState(null);

  // --- LOGIC ---
  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filteredProducts = useMemo(() => 
    products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())), 
  [products, searchQuery]);

  const toggleArrival = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isNewArrival: !p.isNewArrival } : p));
    triggerToast("Web Display Updated");
  };

  const handleDelete = (id) => {
    if(window.confirm("Permanent delete?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
      triggerToast("Item Removed");
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = {
      id: editingProduct?.id || Date.now(),
      name: fd.get('name'),
      price: Number(fd.get('price')),
      category: fd.get('category'),
      isNewArrival: editingProduct?.isNewArrival || false,
      stock: Number(fd.get('stock')) || 0
    };

    setProducts(prev => editingProduct 
      ? prev.map(p => p.id === data.id ? data : p) 
      : [data, ...prev]
    );
    setIsModalOpen(false);
    triggerToast(editingProduct ? "Updated Successfully" : "Added to Inventory");
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] text-slate-900 font-sans antialiased">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-8 z-[110]">
          <Check size={18} className="text-emerald-400" />
          <span className="text-sm font-bold uppercase tracking-widest text-[10px]">{toast}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
            <ShoppingBag className="text-white" size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter">G-CROWN</span>
        </div>

        <nav className="flex-1 px-4 mt-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={18}/>} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<Package size={18}/>} label="Inventory" active={activeTab === 'products'} onClick={() => setActiveTab('products')} />
          <NavItem icon={<Sparkles size={18}/>} label="Web Curation" active={activeTab === 'web'} onClick={() => setActiveTab('web')} />
          <NavItem icon={<ShieldCheck size={18}/>} label="Admin Team" active={activeTab === 'team'} onClick={() => setActiveTab('team')} />
        </nav>

        <div className="p-6 border-t border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200" />
          <div className="text-xs">
            <p className="font-bold">Aditya Verma</p>
            <p className="text-slate-400">System Owner</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 max-w-7xl mx-auto w-full">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight capitalize">{activeTab}</h2>
            <p className="text-slate-500 text-sm font-medium">Lumière Luxury Management Portal</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search catalog..." 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-slate-100 focus:outline-none transition-all"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-colors">
              <Bell size={20} />
            </button>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Revenue (MTD)" value="₹12.45L" trend="+14%" isPositive={true} />
              <StatCard title="Active Listings" value={products.length} trend="Live" isPositive={true} />
              <StatCard title="Conv. Rate" value="3.8%" trend="-2%" isPositive={false} />
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <TrendingUp size={18} className="text-emerald-500" /> Revenue Analytics
              </h3>
              
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={REVENUE_DATA}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                    <Area type="monotone" dataKey="amount" stroke="#0f172a" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm animate-in fade-in duration-500">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400">Inventory Catalog</h3>
              <button onClick={() => { setEditingProduct(null); setIsModalOpen(true); }} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-black transition-all active:scale-95">
                <Plus size={16} /> New Product
              </button>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-800">{p.name}</td>
                    <td className="px-6 py-4 text-xs">
                      <span className="bg-slate-100 px-2 py-1 rounded text-slate-500 font-bold uppercase">{p.category}</span>
                    </td>
                    <td className="px-6 py-4 font-black">₹{p.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setEditingProduct(p); setIsModalOpen(true); }} className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><Edit size={16}/></button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 text-slate-400 hover:text-rose-600 transition-colors"><Trash2 size={16}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'web' || activeTab === 'new-arrivals' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in duration-500">
            {products.map(p => (
              <WebCard key={p.id} product={p} onToggle={toggleArrival} />
            ))}
          </div>
        ) : null}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md border border-slate-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-black text-xs uppercase tracking-widest">{editingProduct ? 'Edit Listing' : 'New Listing'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={18}/></button>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Title</label>
                <input name="name" defaultValue={editingProduct?.name} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-slate-900 outline-none transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Price (₹)</label>
                  <input name="price" type="number" defaultValue={editingProduct?.price} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-slate-900 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</label>
                  <select name="category" defaultValue={editingProduct?.category} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none">
                    <option>Rings</option><option>Necklaces</option><option>Earrings</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-900/20 active:scale-[0.98]">
                {editingProduct ? 'Update Stock' : 'Confirm Item'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// --- HELPER ATOMS ---

const NavItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${active ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20 translate-x-1' : 'text-slate-400 hover:bg-white hover:text-slate-900'}`}
  >
    {icon} {label}
  </button>
);

const StatCard = ({ title, value, trend, isPositive }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-transform hover:-translate-y-1">
    <div className="flex justify-between items-start mb-4">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
      <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {trend}
      </span>
    </div>
    <h4 className="text-3xl font-black tracking-tighter">{value}</h4>
  </div>
);

const WebCard = ({ product, onToggle }) => (
  <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm group hover:border-slate-400 transition-all">
    <div className="relative aspect-square bg-slate-100 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={product.name} />
      {product.isNewArrival && (
        <div className="absolute top-4 left-4 bg-slate-900 text-white text-[9px] font-black px-2 py-1 uppercase rounded-md tracking-widest shadow-2xl">LIVE</div>
      )}
    </div>
    <div className="p-6 space-y-4">
      <div>
        <h5 className="font-bold text-sm line-clamp-1 mb-1">{product.name}</h5>
        <span className="text-[10px] font-black text-slate-400 uppercase">{product.category}</span>
      </div>
      <button 
        onClick={() => onToggle(product.id)}
        className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
          product.isNewArrival ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' : 'bg-slate-900 text-white hover:bg-black active:scale-95'
        }`}
      >
        {product.isNewArrival ? 'Remove from Web' : 'Add to Home'}
      </button>
    </div>
  </div>
);

export default AdminPortal;