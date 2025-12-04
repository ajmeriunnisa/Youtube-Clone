import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 CreateChannel Component
**/

const CreateChannel = () => {
  const navigate = useNavigate();

  // Get logged-in user details (saved during login)
  const user = JSON.parse(localStorage.getItem("user"));

  // Local state to store the channel name typed by user
  const [channelName, setChannelName] = useState("");

  /**
    Handle channel creation
   **/
  const handleCreate = () => {
    if (channelName.trim() === "") {
      alert("Channel name required!");
      return;
    }

    const newChannel = {
      ownerName: user.name,        // logged in user's name
      ownerEmail: user.email,      // logged in user's email
      channelName,                 // user-input channel name
    };

    // Save new channel data so it can be used across the app
    localStorage.setItem("channel", JSON.stringify(newChannel));

    // Redirect to channel page
    navigate("/channel");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow mt-10">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">Create Your Channel</h1>

      {/* Auto-filled Username (non-editable) */}
      <input
        value={user.name}
        disabled
        className="w-full p-2 border rounded-lg mb-3 bg-gray-100"
      />

      {/* Channel Name Input */}
      <input
        type="text"
        placeholder="Enter Channel Name"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4"
      />

      {/* Create Button */}
      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
      >
        Create Channel
      </button>
    </div>
  );
};

export default CreateChannel;
