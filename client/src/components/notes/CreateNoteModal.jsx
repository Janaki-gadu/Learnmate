import { useState } from "react";
import API from "../../api/axios";

export default function CreateNoteModal({ closeModal, onNoteCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("Programming");
  const [tags, setTags] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [pinned, setPinned] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateNote = async () => {
    if (!title.trim() || !content.trim()) {
      return alert("Please fill in both the title and content.");
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("tags", tags);
      formData.append("visibility", visibility);
      formData.append("pinned", pinned);

      if (file) {
        formData.append("file", file);
      }

      const res = await API.post("/notes", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      onNoteCreated(res.data);
      closeModal();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      {/* Modal Container */}
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl max-h-[90vh] flex flex-col relative my-auto">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 sm:p-8 pb-0">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Create New Note
            </h2>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Organize your learning effectively.
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

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Note Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Note Content <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Write your note content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="5"
              className="w-full border border-gray-300 rounded-2xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              placeholder="Ex: react, backend, mongodb (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Visibility
            </label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          {/* Pin Option */}
          <div className="flex items-center gap-3 bg-indigo-50/60 rounded-2xl px-5 py-4 border border-indigo-100">
            <input
              type="checkbox"
              id="pinNote"
              checked={pinned}
              onChange={(e) => setPinned(e.target.checked)}
              className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
            />
            <label htmlFor="pinNote" className="cursor-pointer">
              <p className="font-semibold text-gray-800 text-sm sm:text-base">
                Pin this note
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                Pinned notes appear at the top of your dashboard.
              </p>
            </label>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Attach File
            </label>
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-indigo-300 rounded-2xl cursor-pointer bg-indigo-50/40 hover:bg-indigo-50 transition">
              <div className="flex flex-col items-center justify-center p-4">
                <span className="text-3xl mb-2">📎</span>
                <p className="text-sm font-bold text-indigo-700">
                  Click to Upload File
                </p>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  PDF, DOCX, Images, ZIP (Max 10MB)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0] || null)}
              />
            </label>

            {file && (
              <div className="mt-3 flex items-center justify-between bg-indigo-50 border border-indigo-200 text-indigo-800 px-4 py-2.5 rounded-xl text-sm">
                <span className="truncate max-w-[85%] font-medium">
                  📄 {file.name}
                </span>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-red-500 hover:text-red-700 font-bold ml-2 text-sm"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 sm:p-8 border-t border-gray-100 bg-gray-50/50 rounded-b-3xl">
          <button
            type="button"
            onClick={closeModal}
            className="px-5 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 transition font-semibold text-gray-700 text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreateNote}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition font-semibold disabled:opacity-50 text-sm sm:text-base shadow-sm shadow-indigo-200"
          >
            {loading ? "Creating..." : "Create Note"}
          </button>
        </div>

      </div>
    </div>
  );
}