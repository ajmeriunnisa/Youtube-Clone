import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import videos from "../utils/videos"; 
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Comment from "../components/Comment";
import { FaShare } from "react-icons/fa";
import SuggestedList from "../components/SuggestedList";

const VideoPlayer = () => {
  //  Get video ID from URL
  const { id } = useParams();

  //  Find the video from data
  const video = videos.find((v) => v.id === id);

  if (!video) {
    return <div className="p-4">Video not found</div>;
  }

    const currentUser = JSON.parse(localStorage.getItem("user"));

  // COMMENT INPUT STATE
  const [commentText, setCommentText] = useState("");

  // COMMENTS LIST STATE
  const [comments, setComments] = useState(() => {
  const saved = localStorage.getItem(`comments_${id}`);
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem(`comments_${id}`, JSON.stringify(comments));
}, [comments, id]);

//Error State
const [errorMsg, setErrorMsg] = useState("");

    // ADD COMMENT
  const handleAddComment = () => {
  if (commentText.trim() === "") {
    setErrorMsg("Comment cannot be empty!");
    return;
  }

  setErrorMsg(""); // clear error on success

  const newComment = {
    id: Date.now(),
    userName: currentUser.name,
    userEmail: currentUser.email,
    text: commentText,
  };

  setComments([newComment, ...comments]);
  setCommentText("");
};


  // DELETE COMMENT
  const handleDeleteComment = (id) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  // UPDATE COMMENT
  const handleUpdateComment = (id, newText) => {
    setComments(
      comments.map((c) =>
        c.id === id ? { ...c, text: newText } : c
      )
    );
  };


  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 p-4">
      {/* LEFT SECTION — VIDEO PLAYER + DETAILS */}
      <div className="flex-1 min-w-0">

        {/* VIDEO PLAYER */}
        <video
          controls
          src={video.videoUrl}
          className="w-full rounded-lg "
        />

        {/*  VIDEO TITLE */}
        <h1 className="text-xl font-semibold mt-3">{video.title}</h1>

        {/* CHANNEL + LIKE/DISLIKE SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-6">
        {/* Channel Info + Subscribe */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div>
            <p className="font-bold text-gray-800 text-base sm:text-lg">{video.channelName}</p>
            <p className="text-sm text-gray-500">{video.views} • {video.uploadDate}</p>
          </div>

          {/* STATIC SUBSCRIBE BUTTON */}
          <button className="px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors text-sm sm:text-base">
            Subscribe
          </button>
        </div>

  {/* Action buttons section (Static buttons) */}
  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 sm:mt-0">
    {/* LIKE BUTTON */}
    <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors text-sm sm:text-base">
        <AiOutlineLike className="text-xl text-gray-700" />
        <span>{video.likes}</span>
    </button>

    {/* DISLIKE BUTTON */}
    <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors text-sm sm:text-base">
        <AiOutlineDislike className="text-xl text-gray-700" />
        <span>{video.dislikes}</span>
    </button>

    {/* SHARE BUTTON */}
    <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors text-sm sm:text-base">
        <FaShare className="text-lg text-gray-700" />
        Share
    </button>
  </div>
</div>

        {/* DESCRIPTION */}
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <p className="text-gray-700 text-sm">{video.description}</p>
        </div>

        {/*  COMMENTS SECTION */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-3">Comments</h2>

            {/* Comment Input */}
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a public comment..."
                className="flex-1 border p-2 rounded-md"
              />
              <button
                onClick={handleAddComment}
                className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Post
              </button>
            </div>
            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}


            {/* Render Comments */}
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                currentUser={currentUser}
                onDelete={handleDeleteComment}
                onUpdate={handleUpdateComment}
              />
            ))}
          </div>

      </div>

      {/* RIGHT SECTION — Suggested Videos */}
      <div className="w-full lg:w-1/3 shrink-0">
        <h2 className="text-lg font-bold mb-3">Suggested Videos</h2>

        {/* SuggestedList component */}
        <SuggestedList
          videos={videos}    
          currentId={id}
          limit={6}
        />
      </div>

    </div>
  );
};

export default VideoPlayer;
