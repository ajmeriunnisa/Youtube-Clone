// Channel dashboard with video management
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChannelContent from "../components/ChannelContent";
import EditVideoModal from "../components/EditVideoModal";
import axios from "../api/axios";

const Channel = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState("Videos");
  const [editingVideo, setEditingVideo] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editThumbnail, setEditThumbnail] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch channel and videos on mount
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (!currentUser) {
      navigate("/login");
      return;
    }

    let mounted = true;

    const fetchChannelAndVideos = async () => {
      try {
        const res = await axios.get("/api/channels");
        const myChannel = res.data.find(
          (c) => c.owner?.email === currentUser.email
        );

        if (!mounted) return;

        if (!myChannel) {
          setChannel(null);
          setVideos([]);
        } else {
          setChannel(myChannel);
          localStorage.setItem(
            `channel_${currentUser.email}`,
            JSON.stringify(myChannel)
          );

          const videosRes = await axios.get("/api/videos");
          const myVideos = (videosRes.data || []).filter(
            (v) => String(v.channelId) === String(myChannel._id)
          );
          setVideos(myVideos);
        }
      } catch (err) {
        console.error("Error fetching channel", err);
        if (mounted) alert("Error fetching channel. Please create one.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchChannelAndVideos();
    return () => {
      mounted = false;
    };
  }, [navigate]);

  // Loading state
  if (loading) {
    return <div className="p-6 text-center">Loading channel...</div>;
  }

  // No channel state
  if (!channel) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">No Channel Found</h2>
        <p className="text-gray-600 mt-2">Create your channel first.</p>
      </div>
    );
  }

  // Delete video handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      await axios.delete(`/api/videos/${id}`);
      setVideos((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      alert("Error deleting video");
    }
  };

  // Edit video handler
  const handleEdit = (video) => {
    setEditingVideo(video);
    setEditTitle(video.title);
    setEditDescription(video.description);
    setEditThumbnail(video.thumbnailUrl || video.thumbnail);
  };

  // Save edited video
  const handleSaveEdit = async () => {
    if (!editingVideo) return;
    try {
      const updated = await axios.put(`/api/videos/${editingVideo._id}`, {
        title: editTitle,
        description: editDescription,
        thumbnailUrl: editThumbnail,
      });
      setVideos((prev) =>
        prev.map((v) => (v._id === editingVideo._id ? updated.data.video || updated.data : v))
      );
      setEditingVideo(null);
    } catch (err) {
      alert("Error saving video");
    }
  };

  return (
    <div className="w-full pb-10">
      {/* Channel content with tabs */}
      <ChannelContent
        channel={{
          channelName: channel.name || channel.channelName,
          profileImage: channel.profileImage,
          banner: channel.bannerImage || channel.banner,
          subscribers: channel.subscribers || 0,
          createdAt: channel.createdAt,
        }}
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        channelVideos={videos}
        onEdit={handleEdit}
        onDelete={handleDelete}
        navigate={navigate}
        channelHandle={`@${(channel.name || channel.channelName).replace(/\s+/g, "").toLowerCase()}`}
      />

      {/* Edit video modal */}
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
