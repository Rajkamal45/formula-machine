"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      alert("Login successful!");
    } catch (error: any) {
      setErrorMsg(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-8 max-w-md w-full">
        <h1 className="text-xl font-semibold text-gray-800 text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="p-3 bg-red-100 text-red-700 rounded">
              {errorMsg}
            </div>
          )}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 px-3 py-2 border rounded-md shadow-sm text-sm focus:ring focus:ring-green-400 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 px-3 py-2 border rounded-md shadow-sm text-sm focus:ring focus:ring-green-400 outline-none"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 font-semibold text-white bg-green-500 rounded hover:bg-green-600 ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account? <a href="/Register" className="text-green-500 hover:underline">Sign up here</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;
