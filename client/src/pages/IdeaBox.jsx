import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Plus, Trash2, CheckCircle, Circle } from "lucide-react";

export default function IdeaBox() {
  const [ideas, setIdeas] = useState(() => {
    const saved = localStorage.getItem("learnmate_ideas");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, text: "Build a full-text search index for notes", completed: false },
          { id: 2, text: "Integrate Gemini API for auto flashcards", completed: true },
        ];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("learnmate_ideas", JSON.stringify(ideas));
  }, [ideas]);

  const addIdea = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setIdeas((prev) => [
      { id: Date.now(), text: input.trim(), completed: false },
      ...prev,
    ]);
    setInput("");
  };

  const toggleIdea = (id) => {
    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id ? { ...idea, completed: !idea.completed } : idea
      )
    );
  };

  const deleteIdea = (id) => {
    setIdeas((prev) => prev.filter((idea) => idea.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          <Header />

          {/* Title */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Idea Box</h1>
            <p className="text-gray-500 mt-2 text-lg">
              Quickly jot down learning goals, project ideas, and study reminders.
            </p>
          </div>

          {/* Form */}
          <div className="max-w-4xl">
            <form onSubmit={addIdea} className="flex gap-3">
              <input
                type="text"
                placeholder="What's on your mind? (e.g., Learn Redis caching)..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-5 py-4 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-4 rounded-2xl font-semibold flex items-center gap-2 transition shadow-md shadow-indigo-100 shrink-0"
              >
                <Plus size={20} />
                <span>Add</span>
              </button>
            </form>
          </div>

          {/* Idea Cards List */}
          <div className="max-w-4xl bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-3">
            {ideas.length === 0 ? (
              <p className="text-center text-gray-400 py-8">No ideas saved yet.</p>
            ) : (
              ideas.map((idea) => (
                <div
                  key={idea.id}
                  className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:bg-slate-50 transition gap-4"
                >
                  <button
                    onClick={() => toggleIdea(idea.id)}
                    className="flex items-center gap-3 text-left flex-1"
                  >
                    {idea.completed ? (
                      <CheckCircle className="text-emerald-500 shrink-0" size={22} />
                    ) : (
                      <Circle className="text-gray-300 shrink-0" size={22} />
                    )}
                    <span
                      className={`font-medium ${
                        idea.completed
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {idea.text}
                    </span>
                  </button>

                  <button
                    onClick={() => deleteIdea(idea.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition rounded-xl hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}