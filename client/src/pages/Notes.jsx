import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Filter } from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import NoteCard from "../components/notes/NoteCard";
import CreateNoteModal from "../components/notes/CreateNoteModal";
import EditNoteModal from "../components/notes/EditNoteModal";

import API from "../api/axios";

const CATEGORIES = [
  "All",
  "Programming",
  "React",
  "JavaScript",
  "MongoDB",
  "Node.js",
  "DBMS",
  "Interview Prep",
  "Personal",
  "General",
];

export default function Notes() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const [search, setSearch] = useState("");

  const sortNotes = (noteList) => {
    return [...noteList].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        const res = await API.get("/notes", {
          headers: { Authorization: `Bearer ${token}` },
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
      const token = localStorage.getItem("token");
      await API.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error(error);
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

  // Filter by category + search keywords
  const filteredNotes = notes.filter((note) => {
    const matchesCategory =
      activeCategory === "All" ||
      note.category?.toLowerCase() === activeCategory.toLowerCase();

    const term = search.toLowerCase();
    const titleMatch = note.title?.toLowerCase().includes(term);
    const contentMatch = note.content?.toLowerCase().includes(term);
    const tagsMatch =
      typeof note.tags === "string"
        ? note.tags.toLowerCase().includes(term)
        : Array.isArray(note.tags) &&
          note.tags.some((t) => t.toLowerCase().includes(term));

    return matchesCategory && (titleMatch || contentMatch || tagsMatch);
  });

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          <Header />

          {/* Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Notes Hub</h1>
              <p className="text-gray-500 mt-2 text-lg">
                Organize, filter, and review all your notes across topics.
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl font-semibold flex items-center gap-2 transition shadow-md shadow-indigo-100 shrink-0 w-fit"
            >
              <Plus size={18} />
              <span>New Note</span>
            </button>
          </div>

          {/* Controls: Search + Categories */}
          <div className="space-y-4">
            <div className="relative max-w-md">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search by keyword or tag..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 pr-4 py-3.5 w-full rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-gray-400 p-1">
                <Filter size={18} />
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition ${
                    activeCategory === cat
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Notes Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
          ) : filteredNotes.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center">
              <h3 className="text-2xl font-bold text-gray-800">
                No Notes Found
              </h3>
              <p className="text-gray-500 mt-2">
                {activeCategory !== "All"
                  ? `No notes currently in "${activeCategory}".`
                  : "Start creating notes to populate your workspace."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
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
      </main>

      {/* Modals */}
      {showModal && (
        <CreateNoteModal
          closeModal={() => setShowModal(false)}
          onNoteCreated={handleNoteCreated}
        />
      )}

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