// Channel creation form with existing channel check
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const CreateChannel = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  
  const [form, setForm] = useState({
    name: "",
    description: "",
    bannerImage: "",
    profileImage: "",
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Handle form input changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Create channel or redirect if exists
  const handleCreate = async () => {
    if (!form.name.trim()) return alert("Channel name is required");

    try {
      // Check if user already has a channel
      const checkRes = await axios.get("/api/channels");
      const existing = checkRes.data.find((c) => c.owner?.email === user.email);
      if (existing) {
        alert("You already have a channel");
        localStorage.setItem(`channel_${user.email}`, JSON.stringify(existing));
        localStorage.setItem("userHasChannel", "true");
        window.dispatchEvent(new Event("channelUpdate")); // Notify Header
        return navigate("/channel");
      }

      // Create new channel
      const response = await axios.post("/api/channels", {
        name: form.name,
        description: form.description,
        bannerImage: form.bannerImage,
        profileImage: form.profileImage,
        ownerEmail: user.email,
      });

      const newChannel = response.data;

      // Save channel to localStorage
      localStorage.setItem(`channel_${user.email}`, JSON.stringify(newChannel));
      localStorage.setItem("userHasChannel", "true");

      window.dispatchEvent(new Event("channelUpdate")); // Notify Header

      alert("Channel created successfully!");
      navigate("/channel");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating channel");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Create Your Channel</h2>

      {/* Channel form */}
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Channel Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md h-24"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Banner Image URL</label>
          <input
            name="bannerImage"
            value={form.bannerImage}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Profile Image URL</label>
          <input
            name="profileImage"
            value={form.profileImage}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button
          onClick={handleCreate}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointer"
        >
          Create Channel
        </button>
      </div>
    </div>
  );
};

export default CreateChannel;
