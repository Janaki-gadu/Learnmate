import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Brain,
  Lightbulb,
  Users,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user") || localStorage.getItem("profile");
      if (raw) {
        const parsed = JSON.parse(raw);
        const name = parsed?.user?.name || parsed?.name || parsed?.username;
        if (name) setUserName(name);
      }
    } catch (e) {
      console.error("Error reading user name:", e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, exact: true },
    { name: "Notes", path: "/notes", icon: BookOpen },
    { name: "Quiz", path: "/quiz", icon: Brain },
    { name: "Idea Box", path: "/ideabox", icon: Lightbulb },
    { name: "Groups", path: "/groups", icon: Users },
  ];

  return (
    <aside className="w-72 min-h-screen bg-indigo-600 text-white p-6 flex flex-col justify-between shrink-0 select-none">
      <div>
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">🚀</span>
          <h1 className="text-2xl font-black tracking-tight">LearnMate</h1>
        </div>

        {/* Dynamic User Profile Card */}
        <div className="bg-indigo-500/80 border border-indigo-400/40 rounded-3xl p-5 mt-8">
          <p className="text-indigo-200 text-sm font-medium">Welcome back</p>
          <h2 className="text-2xl font-bold mt-1 text-white capitalize">
            {userName || "Student"}
          </h2>
        </div>

        {/* Navigation */}
        <nav className="mt-8 flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-5 py-3.5 rounded-2xl font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-white text-indigo-600 shadow-md font-bold"
                      : "text-indigo-100 hover:bg-indigo-500/50 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold py-3.5 rounded-2xl transition border border-white/10 w-full"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </aside>
  );
}