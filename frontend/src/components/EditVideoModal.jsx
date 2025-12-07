// Video edit modal component
import React from "react";

const EditVideoModal = ({
  editingVideo,
  editTitle,
  editDescription,
  editThumbnail,
  setEditTitle,
  setEditDescription,
  setEditThumbnail,
  onCancel,
  onSave,
}) => {
  // Early return if no video selected for editing
  if (!editingVideo) return null;

  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center">
      {/* Modal backdrop and container */}
      <div className="bg-white p-6 rounded-md w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Video</h2>

        {/* Title input field */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input className="w-full border p-2 rounded mb-3" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
        </div>

        {/* Description textarea */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea className="w-full border p-2 rounded mb-3" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
        </div>

        {/* Thumbnail URL input */}
        <div>
          <label className="block font-medium mb-1">Thumbnail URL</label>
          <input className="w-full border p-2 rounded mb-3" value={editThumbnail} onChange={(e) => setEditThumbnail(e.target.value)} />
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="bg-gray-300 px-4 py-1 rounded cursor-pointer">Cancel</button>
          <button onClick={onSave} className="bg-blue-600 text-white px-4 py-1 rounded cursor-pointer">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditVideoModal;
