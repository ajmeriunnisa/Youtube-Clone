import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateChannel = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState("");
  const [profileImage, setProfileImage] = useState("");

  if (!user) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-semibold">Please log in to create a channel</h2>
      </div>
    );
  }

  const handleCreate = () => {
    if (!channelName.trim()) {
      alert("Channel name is required!");
      return;
    }

    const newChannel = {
      channelId: "ch_" + Date.now(),
      channelName,
      description,
      ownerEmail: user.email,
      subscribers: 0,
      banner: banner || "https://via.placeholder.com/1200x400",
      profileImage: profileImage || "https://via.placeholder.com/150",
      createdAt: new Date().toISOString(),
      videos: []
    };

    localStorage.setItem("channel", JSON.stringify(newChannel));

    alert("Channel created successfully!");

    navigate("/channel");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Create Your Channel</h2>

      <div className="space-y-4">

        <div>
          <label className="block font-medium mb-1">Channel Name</label>
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md h-24"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Banner Image URL</label>
          <input
            type="text"
            placeholder="Optional"
            value={banner}
            onChange={(e) => setBanner(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Profile Image URL</label>
          <input
            type="text"
            placeholder="Optional"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button
          onClick={handleCreate}
          className="w-full bg-blue-600 text-white py-2 rounded-md text-lg hover:bg-blue-700"
        >
          Create Channel
        </button>
      </div>
    </div>
  );
};

export default CreateChannel;
