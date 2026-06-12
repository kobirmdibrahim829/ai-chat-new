"use client";

import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    if (!name || !email || !password) {
      alert("All fields required");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (data.message) {
      alert("Signup successful!");
      window.location.href = "/login";
    } else {
      alert(data.error || "Signup failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">

      <div className="w-80 p-6 bg-gray-800 rounded-xl space-y-4">

        <h1 className="text-2xl font-bold text-center">
          📝 Signup
        </h1>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded text-black"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded text-black"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded text-black"
        />

        {/* Button */}
        <button
          onClick={signup}
          className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded font-bold"
        >
          Create Account
        </button>

        {/* Login link */}
        <p className="text-center text-gray-400 text-sm">
          Already have account?
        </p>

        <button
          onClick={() => window.location.href = "/login"}
          className="w-full bg-green-500 hover:bg-green-600 py-2 rounded font-bold"
        >
          Login
        </button>

      </div>
    </div>
  );
}