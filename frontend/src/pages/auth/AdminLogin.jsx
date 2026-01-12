import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("adminAuth") === "true") {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    let clientData = {
      email: email,
      password: password
    }

    const apiResponse = await axiosPostService("/customer/auth/login", clientData);

    if (!apiResponse.ok) {
      alert(apiResponse.data.message || "SignIn Failed");
      setError(apiResponse.data.message);
      return;
    }
    else {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin");
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        className="bg-white p-8 rounded-2xl shadow-xl w-80"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-black text-center mb-4">Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full border p-3 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl mb-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold disabled:bg-slate-400"
          disabled={!email || !password}
        >
          Login
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
