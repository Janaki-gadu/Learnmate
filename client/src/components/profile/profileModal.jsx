import { useState } from "react";
import { User, Mail, Target, BookOpen, Save, X, Award } from "lucide-react";
import API from "../../api/axios";

export default function ProfileModal({ user, closeModal, onUserUpdated }) {
  const [name, setName] = useState(user?.name || "Jaanu");
  const [bio, setBio] = useState(user?.bio || "Passionate Full-Stack Developer & Learner");
  const [learningGoal, setLearningGoal] = useState(user?.learningGoal || "Mastering MERN & System Design");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      console.log("Current Token:", token);
      const res = await API.put(
  "/profile",
  { name, bio, learningGoal },
  { headers: { Authorization: `Bearer ${token}` } }
);
      onUserUpdated(res.data);
      closeModal();
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden my-auto border border-gray-100">
        {/* Banner Header */}
        <div className="h-32 bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-400 relative p-6 flex justify-end">
          <button
            onClick={closeModal}
            className="h-9 w-9 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Profile Avatar & Info Overlay */}
        <div className="px-8 pb-8 pt-0 relative">
          <div className="-mt-14 mb-4 flex items-end justify-between">
            <div className="h-24 w-24 rounded-3xl bg-indigo-600 text-white text-3xl font-black flex items-center justify-center border-4 border-white shadow-lg">
              {name.charAt(0).toUpperCase()}
            </div>
            <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3.5 py-1.5 rounded-xl font-bold text-xs">
              <Award size={16} />
              <span>Pro Learner</span>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Display Name
              </label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-gray-800 bg-slate-50/50"
                  required
                />
              </div>
            </div>

            {/* Email (Read Only) */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Account Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={user?.email || "student@learnmate.dev"}
                  disabled
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-gray-100 text-gray-500 font-medium cursor-not-allowed"
                />
              </div>
            </div>

            {/* Headline / Bio */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Bio / Headline
              </label>
              <div className="relative">
                <BookOpen size={18} className="absolute left-4 top-3.5 text-gray-400" />
                <textarea
                  rows="2"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-gray-800 resize-none bg-slate-50/50"
                />
              </div>
            </div>

            {/* Target Learning Goal */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Current Learning Goal
              </label>
              <div className="relative">
                <Target size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={learningGoal}
                  onChange={(e) => setLearningGoal(e.target.value)}
                  placeholder="e.g. Master React & Node.js"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-gray-800 bg-slate-50/50"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2.5 rounded-xl border border-gray-300 font-semibold text-gray-600 hover:bg-gray-100 transition text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-2 transition shadow-md shadow-indigo-100 disabled:opacity-50 text-sm"
              >
                <Save size={16} />
                <span>{loading ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}