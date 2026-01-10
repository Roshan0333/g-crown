import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import modelImage from "../../assets/authPages/signInModel.png";
import logo from "../../assets/authPages/logo.png";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // State for form fields to pass the name to the toast
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API Auth Request
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Extract name from email for a personalized touch (or get from API response)
      const nameFromEmail = email.split('@')[0];
      const displayName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

      // Navigate to home with state for the Toast
      navigate("/", { 
        state: { 
          welcomeMessage: true, 
          userName: displayName,
          isReturningUser: true // Optional flag to differentiate between SignUp and SignIn
        } 
      });
    } catch (error) {
      console.error("Auth failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex h-svh w-full overflow-hidden bg-[#FBF6EA] font-serif selection:bg-[#1E3A2F]/20">
      
      {/* LEFT IMAGE SECTION */}
      <div className="relative hidden w-[45%] lg:block overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={modelImage}
          alt="G-Crown Jewellery Model"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-9 border border-white/50 pointer-events-none z-10" />
        <div className="absolute inset-x-14 bottom-10 z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-lg border border-white/30 bg-white/10 p-8 backdrop-blur-sm"
          >
            <p className="text-[19px] leading-[1.6] tracking-wide text-white font-light drop-shadow-sm">
              Every jewel at G-Crown is a symbol of elegance, precision, and heritage. 
              Crafted by Graphura, our designs are made to be worn like a crown—forever.
            </p>
          </motion.div>
          <div className="mt-8 flex items-center gap-2 px-1">
            <span className="h-1.5 flex-1 rounded-full bg-[#C9A23F] shadow-sm" />
            <span className="h-1.5 flex-1 rounded-full bg-white/40" />
            <span className="h-1.5 flex-1 rounded-full bg-white/40" />
            <span className="h-1.5 flex-1 rounded-full bg-white/40" />
          </div>
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="relative flex w-full flex-col overflow-y-auto lg:w-[55%] bg-[#FDF9F0]">
        <div className="m-auto w-full max-w-[480px] px-8 py-12 lg:px-12">
          
          <header className="mb-10 text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 h-[80px] w-auto"
            >
              <img src={logo} alt="G-Crown" className="h-full object-contain" />
            </motion.div>
            <h1 className="text-[44px] font-normal leading-tight text-[#1E3A2F] tracking-tight">Sign In</h1>
            <p className="mt-2 text-[16px] font-medium text-[#CBA135] tracking-wide">
              Please fill your detail to access your account
            </p>
          </header>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-[14px] font-bold text-[#1E3A2C] tracking-wide">Email*</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full bg-white border border-gray-100 px-4 py-3.5 text-[15px] text-[#1E3A2F] outline-none transition-all focus:border-[#CBA135] focus:ring-1 focus:ring-[#CBA135]/20"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[14px] font-bold text-[#1E3A2C] tracking-wide">Password *</label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full bg-white border border-gray-100 px-4 py-3.5 pr-12 text-[15px] text-[#1E3A2F] outline-none transition-all focus:border-[#CBA135] focus:ring-1 focus:ring-[#CBA135]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#1E3A2F] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-1">
              <label className="group flex cursor-pointer items-center gap-2.5">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 bg-white transition-all checked:bg-[#1E3A2F] checked:border-[#1E3A2F]"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  {/* Custom Checkmark SVG for better luxury look */}
                  <svg className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 left-0.5 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-[14px] font-semibold text-[#1E3A2F]">Remember me</span>
              </label>
              <button type="button" className="text-[14px] font-semibold text-[#1E3A2F] underline hover:opacity-70 transition-opacity">
                Forgot Password?
              </button>
            </div>

            <motion.button 
              type="submit"
              disabled={isLoading}
              whileTap={{ scale: 0.98 }}
              className="relative w-full bg-[#1C332A] py-4 text-[15px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#142620] disabled:opacity-80 disabled:cursor-not-allowed shadow-lg shadow-[#1E3A2F]/10 flex justify-center items-center overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Loader2 className="animate-spin" size={20} />
                  </motion.div>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Sign In
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          <div className="relative my-10 flex items-center justify-center">
            <div className="absolute w-full border-t border-gray-200/60"></div>
            <span className="relative bg-[#FDF9F0] px-4 text-[12px] font-medium text-gray-400">or Sign in with</span>
          </div>

          <motion.button 
            whileTap={{ scale: 0.98 }}
            type="button"
            className="flex w-full items-center justify-center gap-4 border border-gray-200 bg-white py-3.5 text-[14px] font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
            </svg>
            Sign In With Google
          </motion.button>

          <footer className="mt-10 text-center text-[15px] text-gray-600">
            Don't have an account?{" "}
            <button className="font-bold text-[#1E3A2F] underline underline-offset-8 hover:text-black transition-colors"
            onClick={()=>{
              navigate("/signup")
            }}
            >
              Sign Up
            </button>
          </footer>
        </div>
      </div>
    </section>
  );
};

export default SignIn;