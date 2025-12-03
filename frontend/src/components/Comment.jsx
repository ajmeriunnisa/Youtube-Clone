import React, { useState } from "react";

const Comment = ({ comment, currentUser, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);

  const isOwner = currentUser?.email === comment.userEmail; // Only owner can edit/delete

  const handleSave = () => {
    if (editedText.trim() === "") {
  return <p className="text-red-500 text-sm">Comment cannot be empty!</p>;
}

    onUpdate(comment.id, editedText);
    setIsEditing(false);
  };

  return (
    <div className="p-3 bg-gray-100 rounded-lg mb-3">
      {/* USER NAME */}
      <p className="font-semibold text-sm">{comment.userName}</p>

      {/* COMMENT TEXT OR EDIT INPUT */}
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="w-full p-2 border rounded-md mt-2 text-sm"
        />
      ) : (
        <p className="text-gray-700 text-sm mt-1">{comment.text}</p>
      )}

      {/* ACTION BUTTONS */}
      {isOwner && (
        <div className="flex gap-3 mt-2">
          {!isEditing ? (
            <>
              {/* EDIT BUTTON */}
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 text-xs cursor-pointer"
              >
                Edit
              </button>

              {/* DELETE BUTTON */}
              <button
                onClick={() => onDelete(comment.id)}
                className="text-red-600 text-xs cursor-pointer"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              {/* SAVE BUTTON */}
              <button
                onClick={handleSave}
                className="text-green-600 text-xs cursor-pointer"
              >
                Save
              </button>

              {/* CANCEL EDITING */}
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedText(comment.text); // revert old text
                }}
                className="text-gray-600 text-xs cursor-pointer"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
