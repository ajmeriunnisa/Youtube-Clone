import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateChannel = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [channelName, setChannelName] = useState("");
  const [error, setError] = useState("");

  const handleCreate = () => {
    if (!channelName.trim()) {
      setError("Channel name cannot be empty");
      return;
    }

    const newChannel = {
      id: Date.now(),
      name: channelName,
      owner: user.email,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("channel", JSON.stringify(newChannel));
    navigate("/channel");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-xl border">
        
        {/* PROFILE PREVIEW */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-600 text-white flex items-center justify-center text-3xl font-bold uppercase">
            {user?.name[0]}
          </div>
          <p className="text-gray-500 text-sm mt-2">Logged in as {user?.email}</p>
        </div>

        <h1 className="text-2xl font-bold text-center mb-4">Create your channel</h1>

        <p className="text-gray-600 text-center mb-6">
          Your channel name will be shown publicly across YouTube.
        </p>

        {/* INPUT */}
        <label className="text-sm font-medium">Channel Name</label>
        <input
          type="text"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          placeholder="Enter channel name"
          className="w-full mt-2 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* BUTTON */}
        <button
          onClick={handleCreate}
          className="w-full mt-6 bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Create Channel
        </button>
      </div>
    </div>
  );
};

export default CreateChannel;
