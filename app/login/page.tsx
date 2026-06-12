"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔐 Login function
  const login = async () => {
    if (!email || !password) {
      alert("Email & Password required");
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/chat";
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      alert("Server error");
      console.error(err);
    }
  };

  // 👤 Guest login
  const guestLogin = () => {
    const guestId =
      "guest_" + Math.random().toString(36).substring(2, 10);

    localStorage.setItem("token", guestId);
    window.location.href = "/chat";
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6">

        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold">Welcome 👋</h1>
          <p className="text-gray-300 text-sm">
            Login, Signup or Continue as Guest
          </p>
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Login Button */}
        <button
          onClick={login}
          className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold"
        >
          🔐 Login
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px bg-white/20 flex-1"></div>
          <span className="text-xs text-gray-400">OR</span>
          <div className="h-px bg-white/20 flex-1"></div>
        </div>

        {/* Guest Button */}
        <button
          onClick={guestLogin}
          className="w-full bg-purple-600 hover:bg-purple-700 transition py-3 rounded-lg font-semibold"
        >
          👤 Continue as Guest
        </button>

        {/* Signup */}
        <div className="text-center text-sm text-gray-400 mt-2">
          Don’t have an account?
        </div>

        <button
          onClick={() => (window.location.href = "/signup")}
          className="w-full bg-green-600 hover:bg-green-700 transition py-3 rounded-lg font-semibold"
        >
          🆕 Create Account
        </button>

      </div>
    </div>
  );
}