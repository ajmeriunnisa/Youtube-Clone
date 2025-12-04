import React, { useEffect, useState } from "react";
import videos from "../utils/videos";
import { useNavigate } from "react-router-dom";

import ChannelContent from "../components/ChannelContent";
import EditVideoModal from "../components/EditVideoModal";

const Channel = () => {
  const [channel, setChannel] = useState(null);
  const [activeTab, setActiveTab] = useState("Videos");

  // Edit Modal States
  const [editingVideo, setEditingVideo] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editThumbnail, setEditThumbnail] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Load channel
  useEffect(() => {
    setChannel(JSON.parse(localStorage.getItem("channel")));
  }, []);

  if (!channel) {
    return (
      <div className="p-6 text-center">
        <h2>No Channel Found</h2>
        <p>Please create your channel first.</p>
      </div>
    );
  }

  // Merge sample + stored videos
  const storedVideos = JSON.parse(localStorage.getItem("videos")) || [];
  const allVideos = [...videos, ...storedVideos];

  // Filter channel videos
  const channelVideos = allVideos.filter(
    (v) => v.channelId === channel.channelId
  );

  // Username handle
  const channelHandle =
    "@" +
    user?.name.toLowerCase().replace(/ /g, "").replace(/[^a-z0-9]/g, "");

  // Delete Video
  const handleDelete = (id) => {
    const ok = window.confirm("Are you sure you want to delete this video?");
  if (!ok) return;
  
    const updated = storedVideos.filter((v) => v.id !== id);
    localStorage.setItem("videos", JSON.stringify(updated));
    window.location.reload();
  };

  // Save Edited Video
  const handleSaveEdit = () => {
    const updated = storedVideos.map((v) =>
      v.id === editingVideo.id
        ? {
            ...v,
            title: editTitle,
            description: editDescription,
            thumbnail: editThumbnail,
          }
        : v
    );

    localStorage.setItem("videos", JSON.stringify(updated));
    setEditingVideo(null);
    window.location.reload();
  };

  return (
    <div className="w-full pb-10">
      <ChannelContent
        channel={channel}
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        channelVideos={channelVideos}
        onEdit={(video) => {
          setEditingVideo(video);
          setEditTitle(video.title);
          setEditDescription(video.description);
          setEditThumbnail(video.thumbnail);
        }}
        onDelete={handleDelete}
        navigate={navigate}
        channelHandle={channelHandle}
      />

      <EditVideoModal
        editingVideo={editingVideo}
        editTitle={editTitle}
        editDescription={editDescription}
        editThumbnail={editThumbnail}
        setEditTitle={setEditTitle}
        setEditDescription={setEditDescription}
        setEditThumbnail={setEditThumbnail}
        onCancel={() => setEditingVideo(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default Channel;
