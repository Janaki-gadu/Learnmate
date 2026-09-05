import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import FeatureCard from "../components/dashboard/FeatureCard";
import Header from "../components/layout/Header";
import StatsCard from "../components/dashboard/StatsCard";
import NoteCard from "../components/notes/NoteCard";

import CreateNoteModal from "../components/notes/CreateNoteModal";
import EditNoteModal from "../components/notes/EditNoteModal";

import API from "../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const sortNotes = (noteList) => {
    return [...noteList].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  };

  // Helper to reliably retrieve the JWT token from localStorage
  const getAuthToken = () => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile);
        return parsed?.token || parsed;
      } catch {
        return storedProfile;
      }
    }
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = getAuthToken();

        if (!token) {
          navigate("/");
          return;
        }

        const res = await API.get("/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNotes(sortNotes(res.data));
      } catch (error) {
        console.error("Notes Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [navigate]);

  const handleDeleteNote = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      const token = getAuthToken();

      await API.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Delete Note Error:", error);
      alert("Failed to delete note");
    }
  };

  const handleUpdateNote = (updatedNote) => {
    setNotes((prev) =>
      sortNotes(
        prev.map((note) => (note._id === updatedNote._id ? updatedNote : note))
      )
    );
  };

  const handleNoteCreated = (newNote) => {
    setNotes((prev) => sortNotes([newNote, ...prev]));
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          {/* Header */}
          <Header />

          {/* Title Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 mt-2 text-lg">
                Track your study progress and access quick actions.
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl font-semibold flex items-center gap-2 transition shadow-md shadow-indigo-100 shrink-0 w-fit"
            >
              <Plus size={18} />
              <span>+ New Note</span>
            </button>
          </div>

          {/* Welcome Banner */}
          <WelcomeBanner />

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatsCard
              title="Total Notes"
              value={notes.length}
              icon="📘"
            />
            <StatsCard
              title="Daily Streak"
              value="12"
              icon="🔥"
            />
            <StatsCard
              title="Quizzes"
              value="8"
              icon="🧠"
            />
            <StatsCard
              title="Productivity"
              value="89%"
              icon="⚡"
            />
          </div>

          {/* Feature Shortcuts */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <FeatureCard
              icon="🧠"
              title="Take Quiz"
              description="Test your knowledge with quizzes."
              onClick={() => navigate("/quiz")}
            />
            <FeatureCard
              icon="💡"
              title="Idea Box"
              description="Store and organize your ideas."
              onClick={() => navigate("/ideabox")}
            />
            <FeatureCard
              icon="👥"
              title="Study Groups"
              description="Collaborate with other learners."
              onClick={() => navigate("/groups")}
            />
          </div>

          {/* Recent Notes Preview (Limited to Top 3) */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Recent Notes
                </h2>
                <p className="text-gray-500 mt-1 text-sm sm:text-base">
                  Quick preview of your most recent materials.
                </p>
              </div>

              <button
                onClick={() => navigate("/notes")}
                className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1.5 transition text-sm sm:text-base group"
              >
                <span>View All Notes</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
              </button>
            </div>

            {/* Notes Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl p-6 h-64 animate-pulse space-y-4"
                  >
                    <div className="h-6 bg-slate-200 rounded-lg w-2/3"></div>
                    <div className="h-4 bg-slate-200 rounded-md w-1/4"></div>
                    <div className="h-20 bg-slate-100 rounded-lg w-full"></div>
                    <div className="h-8 bg-slate-200 rounded-xl w-1/2 mt-auto"></div>
                  </div>
                ))}
              </div>
            ) : notes.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800">
                  No Notes Found
                </h3>
                <p className="text-gray-500 mt-2 text-sm">
                  Click "+ New Note" above to add your first note.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {notes.slice(0, 3).map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onDelete={handleDeleteNote}
                    onEdit={(selected) => {
                      setSelectedNote(selected);
                      setEditModal(true);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Create Modal */}
      {showModal && (
        <CreateNoteModal
          closeModal={() => setShowModal(false)}
          onNoteCreated={handleNoteCreated}
        />
      )}

      {/* Edit Modal */}
      {editModal && selectedNote && (
        <EditNoteModal
          note={selectedNote}
          closeModal={() => setEditModal(false)}
          onUpdate={handleUpdateNote}
        />
      )}
    </div>
  );
}