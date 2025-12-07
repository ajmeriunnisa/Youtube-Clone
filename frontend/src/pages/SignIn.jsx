// User registration form (Sign Up)
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const SignIn = () => {
  const API = axios;
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", avatar: "" });

  // Handle form input changes
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return alert("Fill all fields");

    try {
      await API.post("/api/user/register", {
        username: form.name,
        email: form.email,
        password: form.password,
        avatar: form.avatar,
      });
      alert("Registration successful — please login");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* Registration form container */}
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter full name"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="text"
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Avatar URL (optional)</label>
            <input
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              type="text"
              placeholder="Paste image URL"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
          >
            Sign Up
          </button>
        </form>
        
        {/* Login link */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
