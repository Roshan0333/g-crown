import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Home,
  MapPin,
  Clock,
  Phone,
  Globe,
  Image as ImageIcon,
  X,
  Map as MapIcon,
  Save,
} from "lucide-react";
import { useAdmin } from "../../context/AdminContext.jsx";
import Toast from "../../components/admin/Toast.jsx";

const Showrooms = () => {
  const { showrooms, addShowroom, updateShowroom, deleteShowroom } = useAdmin();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedShowroom, setSelectedShowroom] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const handleAdd = () => {
    setSelectedShowroom(null);
    setModalOpen(true);
  };

  const handleEdit = (showroom) => {
    setSelectedShowroom(showroom);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this showroom?")) {
      deleteShowroom(id); // ✅ Use context function
      showToast("Showroom deleted successfully");
    }
  };

  // ✅ Save success handles both Add & Edit via context
  const handleSaveSuccess = (data) => {
    if (selectedShowroom) {
      updateShowroom(data); // Edit mode
      showToast("Showroom updated successfully");
    } else {
      addShowroom(data); // Add mode
      showToast("New showroom added");
    }
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FFF8E8]">
      {toast.show && (
        <Toast {...toast} onClose={() => setToast({ ...toast, show: false })} />
      )}

      <div className="max-w-7xl mx-auto p-2 md:p-4 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-8">
          <div>
            <div className="flex items-center gap-2 text-[#08221B] font-bold mb-2">
              <div className="p-1.5 bg-[#08221B] text-[#DFC370] rounded-lg">
                <Home size={18} />
              </div>
              <span>Management System</span>
            </div>
            <h1 className="text-4xl font-black text-[#08221B] tracking-tight">
              Showrooms
            </h1>
            <p className="text-slate-500 mt-1 font-medium">
              Manage your store locations and contact details globally.
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 bg-[#08221B] hover:bg-[#08221B] text-[#DFC370] px-8 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95"
          >
            <Plus size={20} /> Add New Store
          </button>
        </div>

        {/* Showroom List */}
        {showrooms.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-20 text-center border-2 border-dashed border-slate-200">
            <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <Home size={48} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">
              No stores found
            </h3>
            <p className="text-slate-500 mt-2 max-w-xs mx-auto">
              Your showroom list is empty. Click "Add New Store" to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {showrooms.map((s) => (
              <div
                key={s.id}
                className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col md:flex-row h-full"
              >
                {/* Left */}
                <div className="w-full md:w-48 lg:w-56 h-48 md:h-auto relative overflow-hidden bg-slate-100 flex-shrink-0">
                  {s.image ? (
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <ImageIcon size={40} />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-sm">
                    Open
                  </div>
                </div>

                {/* Right */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-black text-slate-800 leading-tight">
                        {s.name}
                      </h2>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(s)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-2 text-sm text-slate-600">
                        <MapPin
                          size={16}
                          className="mt-0.5 text-indigo-500 shrink-0"
                        />
                        <span>
                          {s.street}, {s.city}, {s.state}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock size={16} className="text-indigo-500 shrink-0" />
                        <span>{s.timings}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone size={16} className="text-indigo-500 shrink-0" />
                        <span>{s.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <button
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            s.name + " " + s.city
                          )}`,
                          "_blank"
                        )
                      }
                      className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      <MapIcon size={14} /> View on Google Maps
                    </button>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter tracking-widest">
                      ID: {String(s.id).slice(-6)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <ShowroomModal
          showroom={selectedShowroom}
          onClose={() => setModalOpen(false)}
          onSuccess={handleSaveSuccess}
        />
      )}
    </div>
  );
};

const ShowroomModal = ({ showroom, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    timings: "",
    phone: "",
    image: "",
    mapEmbed: "",
  });

  useEffect(() => {
    if (showroom) setFormData(showroom);
  }, [showroom]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setFormData({ ...formData, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const address = `${formData.street}, ${formData.city}`;
    const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
      address
    )}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    const data = {
      ...formData,
      mapEmbed: mapSrc,
      id: showroom ? showroom.id : Date.now(),
    };
    onSuccess(data);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden relative flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="p-8 pb-4 flex justify-between items-center border-b border-slate-50">
          <div>
            <h2 className="text-2xl font-black text-slate-800">
              {showroom ? "Edit Showroom" : "Add New Showroom"}
            </h2>
            <p className="text-slate-500 text-sm">
              Please fill in the store location and contact details.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
          >
            <X />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">
          {/* General Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-indigo-500 flex items-center gap-2">
              <Globe size={14} /> General Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                required
                name="name"
                placeholder="Store Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <input
                required
                name="phone"
                placeholder="Contact Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-indigo-500 flex items-center gap-2">
              <MapPin size={14} /> Location Details
            </h3>
            <input
              required
              name="street"
              placeholder="Street Address"
              value={formData.street}
              onChange={handleChange}
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <input
                required
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <input
                required
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <input
                required
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <input
                required
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Timings & Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-indigo-500 flex items-center gap-2">
                <Clock size={14} /> Operating Hours
              </h3>
              <input
                required
                name="timings"
                placeholder="Mon - Sat, 10:00 AM - 08:00 PM"
                value={formData.timings}
                onChange={handleChange}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-indigo-500 flex items-center gap-2">
                <ImageIcon size={14} /> Store Image
              </h3>
              <label className="block w-full cursor-pointer p-3 bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-2xl text-center text-indigo-600 font-bold hover:bg-indigo-100 transition-colors">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Preview */}
          {formData.image && (
            <div className="relative group rounded-3xl overflow-hidden h-48 border-4 border-slate-50 shadow-inner">
              <img
                src={formData.image}
                className="w-full h-full object-cover"
                alt="preview"
              />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, image: "" })}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Save size={20} /> {showroom ? "Update Details" : "Save Showroom"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Showrooms;
