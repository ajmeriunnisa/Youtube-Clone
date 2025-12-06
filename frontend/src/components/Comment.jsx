import React, { useState } from "react";

const Comment = ({ comment, currentUser, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);

  const isOwner =
  currentUser &&
  (currentUser._id === comment.userId ||
   currentUser.email === comment.userEmail);

  const handleSave = () => {
  if (editedText.trim() === "") return;
  onUpdate(editedText);
  setIsEditing(false);
};

  return (
    <div className="p-3 bg-gray-100 rounded-lg mb-3 flex gap-3">

      {/* USER AVATAR */}
      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
        {comment.userName.charAt(0)}
      </div>

      <div className="flex-1">

        {/* NAME + ACTIONS */}
        <div className="flex justify-between items-center">
          <p className="font-semibold text-sm">{comment.userName}</p>

          {isOwner && (
            <div className="flex gap-3">
              {!isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-blue-600 text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(comment._id)}
                    className="text-red-600 text-xs"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="text-green-600 text-xs"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditedText(comment.text);
                    }}
                    className="text-gray-600 text-xs"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* TEXT */}
        {isEditing ? (
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full p-2 border rounded-md text-sm"
          />
        ) : (
          <p className="text-gray-700 text-sm">{comment.text}</p>
        )}

        <p className="text-gray-500 text-xs mt-1">
          {new Date(comment.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Comment;
