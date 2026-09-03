import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Users, Plus, ArrowRight } from "lucide-react";

const initialGroups = [
  {
    id: 1,
    name: "Full Stack MERN Builders",
    description: "Collaborative project reviews, Express APIs, and React architectures.",
    members: 14,
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    name: "DSA & System Design Hub",
    description: "Daily LeetCode solving, dynamic programming patterns, and mock interviews.",
    members: 28,
    tags: ["Algorithms", "DBMS", "Interviews"],
  },
  {
    id: 3,
    name: "Python & AI Explorers",
    description: "Machine learning workflows, LLM prompt engineering, and mini apps.",
    members: 19,
    tags: ["Python", "FastAPI", "AI"],
  },
];

export default function StudyGroups() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          <Header />

          {/* Title Header with Clean Button Alignment */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Study Groups</h1>
              <p className="text-gray-500 mt-2 text-lg">
                Join active study rooms or share notes with peers.
              </p>
            </div>

            <button
              onClick={() => alert("Create Group functionality coming in Phase 2!")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl font-semibold flex items-center gap-2 transition shadow-md shadow-indigo-100 shrink-0 w-fit"
            >
              <Plus size={18} />
              <span>+ Create Group</span>
            </button>
          </div>

          {/* Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {initialGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-xl transition duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                      <Users size={22} />
                    </div>
                    <span className="text-xs font-semibold text-gray-500 bg-slate-100 px-3 py-1 rounded-full">
                      {group.members} Members
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mt-5 group-hover:text-indigo-600 transition">
                    {group.name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                    {group.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {group.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => alert(`Joined ${group.name}!`)}
                  className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-indigo-600 hover:text-white text-gray-700 rounded-xl font-semibold transition text-sm"
                >
                  <span>Join Room</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}