import { useState } from "react";
import API from "../../api/axios";

export default function EditNoteModal({ note, closeModal, onUpdate }) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [category, setCategory] = useState(note?.category || "Programming");
  const [tags, setTags] = useState(
    Array.isArray(note?.tags) ? note.tags.join(", ") : note?.tags || ""
  );
  const [pinned, setPinned] = useState(note?.pinned || false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      return alert("Title and content cannot be empty.");
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await API.put(
        `/notes/${note._id}`,
        {
          title,
          content,
          category,
          tags,
          pinned,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onUpdate(res.data);
      closeModal();
    } catch (error) {
      console.error("Update Note Error:", error);
      alert(error.response?.data?.message || "Failed to update note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Edit Note
            </h2>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Update your learning note details.
            </p>
          </div>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 mt-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Content
            </label>
            <textarea
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none resize-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="Programming">Programming</option>
              <option value="General">General</option>
              <option value="React">React</option>
              <option value="JavaScript">JavaScript</option>
              <option value="MongoDB">MongoDB</option>
              <option value="Node.js">Node.js</option>
              <option value="DBMS">DBMS</option>
              <option value="Interview Prep">Interview Prep</option>
              <option value="Personal">Personal</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Tags
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="react, state, fullstack"
              className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Pin */}
          <div className="flex items-center gap-3 bg-indigo-50/60 rounded-2xl px-5 py-3.5 border border-indigo-100">
            <input
              type="checkbox"
              id="pinEditNote"
              checked={pinned}
              onChange={(e) => setPinned(e.target.checked)}
              className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
            />
            <label htmlFor="pinEditNote" className="cursor-pointer text-sm font-semibold text-gray-800">
              Keep this note pinned to top
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={closeModal}
            className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition font-semibold text-gray-700 text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpdate}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition font-semibold disabled:opacity-50 text-sm shadow-sm"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}