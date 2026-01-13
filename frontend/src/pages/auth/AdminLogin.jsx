import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import modelImage from "../../assets/authPages/signInModel.png";
import logo from "../../assets/authPages/logo.png";
import { axiosPostService } from "../../services/axios";

const AdminSignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const clientData = { email, password };
      const apiResponse = await axiosPostService("/admin/auth/login", clientData);

      if (!apiResponse.ok) {
        alert(apiResponse.data.message || "Admin Access Denied");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Admin Auth failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex h-svh w-full overflow-hidden bg-[#FBF6EA] font-serif selection:bg-[#1E3A2F]/20">
      
      {/* LEFT IMAGE SECTION */}
      <div className="relative hidden w-[45%] lg:block overflow-hidden bg-[#1E3A2F]">
        <motion.img
          initial={{ scale: 1.05, opacity: 0.9 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          src={modelImage}
          alt="G-Crown Collection"
          className="h-full w-full object-cover object-center pointer-events-none"
        />
        <div className="absolute inset-9 border border-white/40 pointer-events-none z-10" />
        
        <div className="absolute inset-x-14 bottom-12 z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="rounded-xl border border-white/20 bg-black/10 p-8 backdrop-blur-md"
          >
            <p className="text-[18px] leading-[1.7] tracking-wide text-white font-light antialiased">
              Administrator Portal: Oversee the symbol of elegance, precision,
              and heritage. Authorized access only.
            </p>
          </motion.div>
          {/* Stepper/Pagination Visual */}
          <div className="mt-8 flex items-center gap-2.5 px-1">
            <span className="h-1 flex-1 rounded-full bg-[#C9A23F] transition-all" />
            <span className="h-1 flex-1 rounded-full bg-white/20" />
            <span className="h-1 flex-1 rounded-full bg-white/20" />
            <span className="h-1 flex-1 rounded-full bg-white/20" />
          </div>
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="relative flex w-full flex-col overflow-y-auto lg:w-[55%] bg-[#FDF9F0]">
        
        {/* Semantic Header / Navigation */}
        <nav className="absolute left-8 top-10 lg:left-12">
          <button
            onClick={() => navigate("/signin")}
            className="group flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-[#1E3A2F] transition-all hover:opacity-60"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> 
            Back to Sign In
          </button>
        </nav>

        <main className="m-auto w-full max-w-[520px] px-8 py-20 lg:px-16">
          <header className="mb-12 text-left">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 h-[70px]"
            >
              <img src={logo} alt="G-Crown Logo" className="h-full object-contain" />
            </motion.div>
            <h1 className="text-[40px] font-normal leading-tight text-[#1E3A2F] tracking-tight lg:text-[48px]">
              Admin Login
            </h1>
            <p className="mt-3 text-[15px] font-medium text-[#CBA135] tracking-[0.05em] uppercase">
              Management Console Entry
            </p>
          </header>

          <form className="flex flex-col gap-7" onSubmit={handleAdminSubmit}>
            <div className="space-y-2.5">
              <label htmlFor="admin-email" className="block text-[12px] font-black uppercase tracking-[0.15em] text-[#1E3A2C]">
                Personnel Email
              </label>
              <input
                id="admin-email"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@g-crown.com"
                className="w-full bg-white border border-gray-100 px-5 py-4 text-[15px] text-[#1E3A2F] shadow-sm outline-none transition-all placeholder:text-gray-300 focus:border-[#CBA135] focus:ring-4 focus:ring-[#CBA135]/5"
              />
            </div>

            <div className="space-y-2.5">
              <label htmlFor="admin-password" className="block text-[12px] font-black uppercase tracking-[0.15em] text-[#1E3A2C]">
                Secure Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-gray-100 px-5 py-4 pr-14 text-[15px] text-[#1E3A2F] shadow-sm outline-none transition-all placeholder:text-gray-300 focus:border-[#CBA135] focus:ring-4 focus:ring-[#CBA135]/5"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#CBA135] transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileTap={{ scale: 0.985 }}
              className="relative mt-2 h-[60px] w-full bg-[#1C332A] text-[14px] font-bold uppercase tracking-[0.25em] text-white shadow-xl shadow-[#1E3A2F]/15 transition-all hover:bg-[#142620] hover:shadow-2xl disabled:opacity-70 flex justify-center items-center overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Loader2 className="animate-spin" size={20} />
                  </motion.div>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    Authorize Access
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          <footer className="mt-16 text-center">
             <div className="mb-10 flex flex-col items-center gap-3">
                <p className="text-[14px] text-gray-500 font-medium">
                  Need administrative access?
                </p>
                <button
                  className="group relative text-[14px] font-bold text-[#1E3A2F] uppercase tracking-widest"
                  onClick={() => navigate("/admin-signup")}
                >
                  Register Admin
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#CBA135] transition-all group-hover:w-full" />
                </button>
             </div>

            <div className="border-t border-gray-200/60 pt-8">
              <p className="text-[11px] text-gray-400 uppercase tracking-[0.3em] font-bold leading-relaxed">
                Security Core v4.0.2 <br /> 
                <span className="opacity-60">Authorized Personnel Only</span>
              </p>
            </div>
          </footer>
        </main>
      </div>
    </section>
  );
};

export default AdminSignIn;