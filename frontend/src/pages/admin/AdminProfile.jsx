import React, { useState, useEffect } from "react";
import { Edit3, Save, X, Image as ImageIcon } from "lucide-react";
import Toast from "../../components/admin/Toast.jsx";

const AdminProfile = () => {
  // Initial dummy data (real app me backend/API se fetch hota)
  const initialAdmin = {
    name: "Vishal Kushwaha",
    email: "vishal@example.com",
    contact: "9876543210",
    gender: "Male",
    profilePic: "",
  };

  const [admin, setAdmin] = useState(initialAdmin);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(initialAdmin);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  useEffect(() => {
    setFormData(admin);
  }, [admin]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setFormData({ ...formData, profilePic: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setAdmin(formData);
    setEditMode(false);
    showToast("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-[#FFF8E8] flex justify-center items-start pt-5 p-2">
      {toast.show && (
        <Toast {...toast} onClose={() => setToast({ ...toast, show: false })} />
      )}

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-[[#08221B]]">
            Admin Profile
          </h1>
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#08221B] text-[#DFC370] rounded-2xl font-bold hover:bg-indigo-700"
            >
              <Edit3 size={16} /> Edit
            </button>
          )}
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-100 shadow-inner">
            {formData.profilePic ? (
              <img
                src={formData.profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-indigo-50 text-indigo-300">
                <ImageIcon size={48} />
              </div>
            )}
            {editMode && (
              <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />
                <Edit3 size={16} />
              </label>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase text-indigo-500">
                Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full p-3.5 mt-1 rounded-2xl border ${
                  editMode
                    ? "border-indigo-300 focus:ring-2 focus:ring-indigo-500"
                    : "border-slate-200 bg-slate-50"
                } outline-none transition-all`}
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-indigo-500">
                Email
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full p-3.5 mt-1 rounded-2xl border ${
                  editMode
                    ? "border-indigo-300 focus:ring-2 focus:ring-indigo-500"
                    : "border-slate-200 bg-slate-50"
                } outline-none transition-all`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase text-indigo-500">
                Contact
              </label>
              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full p-3.5 mt-1 rounded-2xl border ${
                  editMode
                    ? "border-indigo-300 focus:ring-2 focus:ring-indigo-500"
                    : "border-slate-200 bg-slate-50"
                } outline-none transition-all`}
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-indigo-500">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full p-3.5 mt-1 rounded-2xl border ${
                  editMode
                    ? "border-indigo-300 focus:ring-2 focus:ring-indigo-500"
                    : "border-slate-200 bg-slate-50"
                } outline-none transition-all`}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        {editMode && (
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => setEditMode(false)}
              className="flex-1 py-3 rounded-2xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 rounded-2xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center gap-2 transition-all"
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
