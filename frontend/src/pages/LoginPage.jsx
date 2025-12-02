import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  // Local state for form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    alert("Login successful");

    // Save login state
  localStorage.setItem("user", "logged_in");

  // Redirect to Home Page
  window.location.href = "/";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

      {/* Card Container */}
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        {/* App Logo */}
        <h1 className="text-2xl font-bold text-red-600 text-center mb-6">
          My YouTube Clone
        </h1>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
          Sign In
        </h2>

        {/* FORM */}
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">

          {/* Email Field */}
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Field */}
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Footer Links */}
        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Don’t have an account?
            <Link to="/signup" className="text-red-600 font-semibold ml-1">
              Sign Up
            </Link>
          </p>

          <button className="text-gray-500 text-sm mt-2 hover:underline">
            Forgot Password?
          </button>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
